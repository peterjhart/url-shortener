import {
  ChangeEvent,
  MouseEvent,
  ReactElement,
  useEffect,
  useState,
} from 'react'
import { Link } from 'react-router-dom'
import { createLink } from '@/lib/api/api'

export default function LinkCreate(): ReactElement {
  const [alias, setAlias] = useState<string>('')
  const [link, setLink] = useState<string>('')

  useEffect(() => {
    document.title = 'URL Shortener Admin: Create a Link'
  }, [])

  function changeAlias(event: ChangeEvent<HTMLInputElement>) {
    setAlias(event.target.value)
  }

  function changeLink(event: ChangeEvent<HTMLInputElement>) {
    setLink(event.target.value)
  }

  async function submit(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    event.stopPropagation()
    await createLink(link, alias)
    setLink('')
    setAlias('')
  }

  return (
    <div>
      <h2>Shorten a Link</h2>
      <div>
        <Link to="/admin/links">Back to Links</Link>
      </div>
      <form>
        <div className="mb-4">
          <label htmlFor="input_alias" className="block">
            Alias
          </label>
          <input
            className="border border-gray-400 rounded p-1"
            id="input_alias"
            onChange={changeAlias}
            type="text"
            value={alias}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="input_link" className="block">
            Link
          </label>
          <input
            className="w-1/2 border border-gray-400 rounded p-1"
            id="input_link"
            onChange={changeLink}
            type="text"
            value={link}
          />
        </div>
        <div className="mb-4">
          <button
            className="text-white bg-fuchsia-800 hover:bg-fuchsia-600 p-3 border-0 rounded-md"
            onClick={submit}
            type="button"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  )
}
