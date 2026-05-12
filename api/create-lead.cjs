const https = require('https')

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  try {
    const { name, phone } = req.body || {}

    const payload = JSON.stringify({
      clientData: { fullName: name, phoneNumber: phone },
      pipeline: { stage: 32374, leadSource: 16928 },
    })

    return new Promise((resolve) => {
      const options = {
        hostname: 'rest.lee.co.il',
        path: '/leads/create-new-lead',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'eyJzIjoxLCJzdSI6IjY2YTI0MThlNmY2ODkifQ==',
          'Content-Length': Buffer.byteLength(payload),
        },
      }

      const r = https.request(options, (r2) => {
        let data = ''
        r2.on('data', chunk => { data += chunk })
        r2.on('end', () => {
          res.status(r2.statusCode).send(data)
          resolve()
        })
      })

      r.on('error', (err) => {
        res.status(500).json({ error: err.message })
        resolve()
      })

      r.write(payload)
      r.end()
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
