import { ReactElement, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export interface ShortenedLink {
  id: string
  url: string
  alias?: string
  createdAt?: string
}

async function getLinks(): Promise<ShortenedLink[]> {
  const url = '/api/links'
  const options = {
    method: 'GET',
  }
  const response = await fetch(url, options)
  return await response.json()
}

export default function Links(): ReactElement {
  const [links, setLinks] = useState<ShortenedLink[]>([])

  useEffect(() => {
    document.title = 'URL Shortener Admin: Links'
  }, [])

  useEffect(() => {
    getLinks().then(
      (response) => setLinks(response),
      (error) => console.error('Links could not be fetched.', error),
    )
  }, [])

  return (
    <div>
      <h2>Links</h2>
      <div>
        <Link to="/admin/links/create">New Link</Link>
      </div>

      <table className="table-auto w-full bg-gray-100">
        <thead className="bg-gray-300">
          <tr>
            <th className="bg-gray-300 rounded-tl-md text-left">Alias</th>
            <th className="bg-gray-300 rounded-tr-md text-left">Link</th>
          </tr>
        </thead>
        <tbody>
          {links.map((shortenedLink) => (
            <LinkRow key={shortenedLink.id} shortenedLink={shortenedLink} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

function LinkRow({
  shortenedLink,
}: {
  shortenedLink: ShortenedLink
}): ReactElement {
  return (
    <tr className="border border-t-0">
      <td>{shortenedLink.alias}</td>
      <td>{shortenedLink.url}</td>
    </tr>
  )
}
