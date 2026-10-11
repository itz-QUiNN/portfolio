export interface ContactPayload {
  name: string
  email: string
  project_type: string
  budget: string
  message: string
  website: string
}

export class ApiError extends Error {
  status: number

  constructor(status: number) {
    super(`Request failed with status ${status}`)
    this.status = status
  }
}

export async function sendContact(payload: ContactPayload): Promise<void> {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!response.ok) {
    throw new ApiError(response.status)
  }
}

export interface YouTubeDemo {
  is_sample: boolean
  video_id: string
  metadata: Record<string, string | number>
  chapters: { start_seconds: number; title: string }[]
  transcript: { start_seconds: number; text: string }[]
}

export async function fetchYouTubeDemo(url: string): Promise<YouTubeDemo> {
  const response = await fetch('/api/demos/youtube', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  })
  if (!response.ok) {
    throw new ApiError(response.status)
  }
  return response.json() as Promise<YouTubeDemo>
}

export interface InvoiceSample {
  id: string
  label: string
  description: string
}

export interface InvoiceDemoResult {
  is_sample: boolean
  sample_id: string
  fields: {
    vendor: string
    invoice_number: string
    issue_date: string
    currency: string
    line_items: { description: string; quantity: number; unit_price: string }[]
    subtotal: string
    tax: string
    total: string
  }
  checks: { name: string; passed: boolean; detail: string }[]
  valid: boolean
}

export async function fetchInvoiceSamples(): Promise<InvoiceSample[]> {
  const response = await fetch('/api/demos/invoices')
  if (!response.ok) {
    throw new ApiError(response.status)
  }
  return response.json() as Promise<InvoiceSample[]>
}

export async function fetchInvoiceDemo(sampleId: string): Promise<InvoiceDemoResult> {
  const response = await fetch('/api/demos/invoice', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sample_id: sampleId }),
  })
  if (!response.ok) {
    throw new ApiError(response.status)
  }
  return response.json() as Promise<InvoiceDemoResult>
}
