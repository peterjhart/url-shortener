import { ReactElement, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function AdminHome(): ReactElement {
  useEffect(() => {
    document.title = 'URL Shortener Admin'
  }, [])

  return (
    <div>
      <p>Here is where you can manage your URLs.</p>
      <Link to="/admin/links/create">Create a Link</Link>
    </div>
  )
}
