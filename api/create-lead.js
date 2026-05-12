export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { name, phone } = req.body

  const response = await fetch('https://rest.lee.co.il/leads/create-new-lead', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'eyJzIjoxLCJzdSI6IjY2YTI0MThlNmY2ODkifQ==',
    },
    body: JSON.stringify({
      clientData: { fullName: name, phoneNumber: phone },
      pipeline: { stage: 32374, leadSource: 16928 },
    }),
  })

  const text = await response.text()
  res.status(response.status).send(text)
}
