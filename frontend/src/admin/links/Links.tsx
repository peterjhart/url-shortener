import { ReactElement, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Links(): ReactElement {
  useEffect(() => {
    document.title = 'URL Shortener Admin: Links'
  }, [])

  return (
    <div>
      <h2>Links</h2>
      <div>
        <Link to="/admin/links/create">New Link</Link>
      </div>
    </div>
  )
}
