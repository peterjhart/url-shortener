import { ReactElement } from 'react'
import { Link } from 'react-router-dom'

export default function LinkCreate(): ReactElement {
  return (
    <div>
      <h2>Shorten a Link</h2>
      <div>
        <Link to="/links">Back to Links</Link>
      </div>
    </div>
  )
}
