const ZAPIER_WEBHOOK = 'https://hooks.zapier.com/hooks/catch/27094098/46uhrh4'

export async function submitLead(name, phone) {
  const response = await fetch('/api/create-lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: name.trim(), phone: phone.trim(), hp: '' }),
  })

  // If BoostApp API succeeds, also send to Zapier
  if (response.ok) {
    fetch(ZAPIER_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: name.trim(),
        phone: phone.trim(),
        source: 'contact_form',
        receivedAt: new Date().toISOString(),
      }),
    }).catch(err => {
      console.error('[Zapier] webhook error:', err.message)
    })
  }

  return response
}
