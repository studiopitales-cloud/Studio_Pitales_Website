import https from 'https'

const ZAPIER_WEBHOOK = process.env.ZAPIER_WEBHOOK_URL

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

async function sendToZapier(name, phone) {
  if (!ZAPIER_WEBHOOK) {
    console.warn('[Zapier] ZAPIER_WEBHOOK_URL not configured')
    return
  }
  try {
    const payload = {
      full_name: name,
      phone: phone,
    }
    await fetch(ZAPIER_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch (err) {
    console.error('[Zapier] Error:', err.message)
  }
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
    pipeline: { id: 5324, stage: 45233, leadSource: 16928 },
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
    r2.on('end', () => {
      // If BoostApp succeeds, also send to Zapier
      if (r2.statusCode >= 200 && r2.statusCode < 300) {
        sendToZapier(trimmedName, phone)
      }
      res.status(r2.statusCode).send(data)
    })
  })

  r.on('error', (err) => res.status(500).json({ error: err.message }))
  r.write(payload)
  r.end()
}
