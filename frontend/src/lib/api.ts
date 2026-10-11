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
