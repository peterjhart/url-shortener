import { ReactElement, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function LinkCreate(): ReactElement {
  useEffect(() => {
    document.title = 'URL Shortener Admin: Create a Link'
  }, [])

  return (
    <div>
      <h2>Shorten a Link</h2>
      <div>
        <Link to="/links">Back to Links</Link>
      </div>
    </div>
  )
}
