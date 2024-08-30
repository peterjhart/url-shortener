export interface ShortenedLink {
  id: string
  url: string
  alias?: string
  createdAt?: string
}

export async function createLink(link: string, alias?: string): Promise<void> {
  const url = '/api/links'
  const body = JSON.stringify({ alias, url: link } as ShortenedLink)
  const options = {
    method: 'POST',
    headers: {},
    body,
  }
  const response = await fetch(url, options)
  await response.json()
}

export async function getLinks(): Promise<ShortenedLink[]> {
  const url = '/api/links'
  const options = {
    method: 'GET',
  }
  const response = await fetch(url, options)
  return await response.json()
}
