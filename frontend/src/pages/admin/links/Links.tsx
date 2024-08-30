import { ReactElement, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getLinks, ShortenedLink } from '@/lib/api/api'
import LinkList from '@/components/link-list/link-list'

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

      <LinkList links={links} />
    </div>
  )
}
