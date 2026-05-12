import https from 'https'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  try {
    const body = req.body
    const name = body?.name ?? 'missing'
    const phone = body?.phone ?? 'missing'

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

      const req2 = https.request(options, (res2) => {
        let data = ''
        res2.on('data', chunk => { data += chunk })
        res2.on('end', () => {
          res.status(res2.statusCode).send(data)
          resolve()
        })
      })

      req2.on('error', (err) => {
        res.status(500).json({ stage: 'https_request', error: err.message })
        resolve()
      })

      req2.write(payload)
      req2.end()
    })
  } catch (err) {
    res.status(500).json({ stage: 'handler', error: err.message, stack: err.stack })
  }
}
