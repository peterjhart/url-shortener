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
      <form>
        <div className="mb-4">
          <label htmlFor="input_alias" className="block">
            Alias
          </label>
          <input
            type="text"
            id="input_alias"
            className="border border-gray-400 rounded p-1"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="input_link" className="block">
            Link
          </label>
          <input
            type="text"
            id="input_link"
            className="w-1/2 border border-gray-400 rounded p-1"
          />
        </div>
        <div className="mb-4">
          <button className="text-white bg-fuchsia-800 hover:bg-fuchsia-600 p-3 border-0 rounded-md">
            Create
          </button>
        </div>
      </form>
    </div>
  )
}
