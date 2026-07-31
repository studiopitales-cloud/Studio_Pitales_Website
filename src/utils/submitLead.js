export async function submitLead(name, phone) {
  return fetch('/api/create-lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: name.trim(), phone: phone.trim(), hp: '' }),
  })
}
