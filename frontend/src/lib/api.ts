export interface ContactPayload {
  name: string
  email: string
  project_type: string
  budget: string
  message: string
  website: string
}

export async function sendContact(payload: ContactPayload): Promise<void> {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }
}
