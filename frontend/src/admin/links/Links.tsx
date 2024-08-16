import { ReactElement } from 'react'
import { Link } from 'react-router-dom'

export default function Links(): ReactElement {
  return (
    <div>
      <h2>Links</h2>
      <div>
        <Link to="/links/create">New Link</Link>
      </div>
    </div>
  )
}
