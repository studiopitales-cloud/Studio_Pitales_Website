const ZAPIER_WEBHOOK = 'https://hooks.zapier.com/hooks/catch/27094098/46uhrh4'

export async function submitLead(name, phone) {
  console.log('[submitLead] Starting with name:', name, 'phone:', phone)

  const response = await fetch('/api/create-lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: name.trim(), phone: phone.trim(), hp: '' }),
  })

  console.log('[submitLead] BoostApp response status:', response.status, response.ok)

  // If BoostApp API succeeds, also send to Zapier
  if (response.ok) {
    const params = new URLSearchParams()
    params.append('full_name', name.trim())
    params.append('phone', phone.trim())

    const bodyString = params.toString()
    console.log('[Zapier] Sending webhook with body:', bodyString)
    console.log('[Zapier] Webhook URL:', ZAPIER_WEBHOOK)

    fetch(ZAPIER_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: bodyString,
    })
      .then(r => {
        console.log('[Zapier] Got response status:', r.status)
        return r.text()
      })
      .then(text => {
        console.log('[Zapier] Response text:', text)
      })
      .catch(err => {
        console.error('[Zapier] Error:', err.message, err.stack)
      })
  } else {
    console.log('[submitLead] BoostApp failed with status:', response.status)
  }

  return response
}
