import https from 'https'

// In-memory rate limit store: "ip:YYYY-MM-DD" → count
const ipLog = new Map()

function today() {
  return new Date().toISOString().slice(0, 10)
}

function checkRate(ip) {
  const key = `${ip}:${today()}`
  const count = ipLog.get(key) || 0

  // Clean stale entries from previous days
  for (const k of ipLog.keys()) {
    if (!k.endsWith(today())) ipLog.delete(k)
  }

  if (count >= 3) return { blocked: true }
  ipLog.set(key, count + 1)
  return { blocked: false }
}

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  // ── Honeypot ──────────────────────────────────────────────────
  const { name, phone, hp } = req.body || {}
  if (hp) return res.status(200).json({ ok: true }) // silent drop

  // ── Input validation ──────────────────────────────────────────
  const trimmedName = typeof name === 'string' ? name.trim() : ''
  if (trimmedName.length < 2 || trimmedName.length > 30)
    return res.status(400).json({ error: 'invalid name' })
  if (typeof phone !== 'string' || !/^05\d{8}$/.test(phone))
    return res.status(400).json({ error: 'invalid phone' })

  // ── Rate limit ────────────────────────────────────────────────
  const ip =
    (req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    'unknown'

  const { blocked } = checkRate(ip)
  if (blocked) return res.status(429).json({ error: 'too many requests' })

  // ── Forward to CRM ────────────────────────────────────────────
  const payload = JSON.stringify({
    clientData: { fullName: name, phone: phone },
    pipeline: { stage: 32374, leadSource: 16928 },
    subscription: {},
  })

  const options = {
    hostname: 'rest.lee.co.il',
    path: '/leads/create-new-lead',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.BOOSTAPP_API_KEY,
      'Content-Length': Buffer.byteLength(payload),
    },
  }

  const r = https.request(options, (r2) => {
    let data = ''
    r2.on('data', chunk => { data += chunk })
    r2.on('end', () => { res.status(r2.statusCode).send(data) })
  })

  r.on('error', (err) => res.status(500).json({ error: err.message }))
  r.write(payload)
  r.end()
}
