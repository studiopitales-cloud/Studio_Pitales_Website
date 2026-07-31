const ZAPIER_WEBHOOK = 'https://hooks.zapier.com/hooks/catch/27094098/46uhrh4'

export async function submitLead(name, phone) {
  const response = await fetch('/api/create-lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: name.trim(), phone: phone.trim(), hp: '' }),
  })

  // If BoostApp API succeeds, also send to Zapier
  if (response.ok) {
    const params = new URLSearchParams()
    params.append('full_name', name.trim())
    params.append('phone', phone.trim())

    fetch(ZAPIER_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    }).catch(err => {
      console.error('[Zapier] Error:', err.message)
    })
  }

  return response
}
