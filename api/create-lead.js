import https from 'https'

const ZAPIER_WEBHOOK = 'https://hooks.zapier.com/hooks/catch/27094098/46uhrh4'

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

async function sendToZapier(fullName, phone) {
  if (!ZAPIER_WEBHOOK) {
    console.warn('[Zapier] ZAPIER_WEBHOOK_URL not configured')
    return
  }

  const zapierPayload = {
    full_name: fullName,
    phone: phone,
  }

  console.log('[Zapier] Debug info:', {
    fullName,
    phone,
    zapierPayload,
    webhookUrl: ZAPIER_WEBHOOK,
  })

  try {
    const response = await fetch(ZAPIER_WEBHOOK, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(zapierPayload),
    })

    console.log('[Zapier] Response status:', response.status, response.statusText)
    const responseText = await response.text()
    console.log('[Zapier] Response body:', responseText)
  } catch (err) {
    console.error('[Zapier] Error:', err.message)
  }
}

export default async function handler(req, res) {
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

  // ── TEST: Skip BoostApp, send directly to Zapier ────────────────
  console.log('[TEST] Sending to Zapier with:', { trimmedName, phone })

  try {
    await sendToZapier(trimmedName, phone)
    console.log('[TEST] Zapier send completed')
    res.status(200).json({ success: true, message: 'Sent to Zapier' })
  } catch (err) {
    console.error('[TEST] Zapier send failed:', err.message)
    res.status(500).json({ error: err.message })
  }
}
