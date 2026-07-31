const ZAPIER_WEBHOOK = 'https://hooks.zapier.com/hooks/catch/27094098/46uhrh4'

export async function submitLead(name, phone) {
  const response = await fetch('/api/create-lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: name.trim(), phone: phone.trim(), hp: '' }),
  })

  // If BoostApp API succeeds, also send to Zapier
  if (response.ok) {
    const payload = {
      full_name: name.trim(),
      phone: phone.trim(),
    }
    const bodyString = JSON.stringify(payload)
    console.log('[Zapier] Payload object:', payload)
    console.log('[Zapier] Body string:', bodyString)
    console.log('[Zapier] Body length:', bodyString.length)

    fetch(ZAPIER_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: bodyString,
    })
      .then(r => {
        console.log('[Zapier] Response status:', r.status, r.statusText)
        if (!r.ok) console.warn('[Zapier] Response not OK')
        return r.text().then(text => {
          console.log('[Zapier] Response body:', text)
          try { return JSON.parse(text) } catch { return {} }
        })
      })
      .then(data => {
        console.log('[Zapier] Parsed response:', data)
      })
      .catch(err => {
        console.error('[Zapier] Error:', err.message)
      })
  }

  return response
}
