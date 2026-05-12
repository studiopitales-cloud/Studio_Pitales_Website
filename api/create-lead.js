import https from 'https'

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { name, phone } = req.body || {}

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
    r2.on('end', () => { console.log('[BoostApp response]', data); res.status(r2.statusCode).send(data) })
  })

  r.on('error', (err) => res.status(500).json({ error: err.message }))
  r.write(payload)
  r.end()
}
