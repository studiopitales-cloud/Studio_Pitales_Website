const ZAPIER_WEBHOOK = 'https://hooks.zapier.com/hooks/catch/27094098/46uhrh4'

export async function submitLead(name, phone) {
  console.log('[submitLead] Starting:', { name, phone })

  const response = await fetch('/api/create-lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: name.trim(), phone: phone.trim(), hp: '' }),
  })

  console.log('[submitLead] BoostApp status:', response.status, response.ok)

  if (response.ok) {
    const payload = {
      full_name: name.trim(),
      phone: phone.trim(),
    }
    const jsonBody = JSON.stringify(payload)

    console.log('[Zapier] Payload:', payload)
    console.log('[Zapier] JSON Body:', jsonBody)
    console.log('[Zapier] Sending to:', ZAPIER_WEBHOOK)

    const zapierFetch = fetch(ZAPIER_WEBHOOK, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonBody,
    })

    zapierFetch
      .then(r => {
        console.log('[Zapier] Response received. Status:', r.status, r.statusText)
        return r.json().catch(() => ({}))
      })
      .then(data => {
        console.log('[Zapier] Response body:', data)
      })
      .catch(err => {
        console.error('[Zapier] Fetch failed:', err)
      })
  }

  return response
}
