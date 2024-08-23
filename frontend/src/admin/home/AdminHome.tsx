import { ReactElement, useEffect } from 'react'

export default function AdminHome(): ReactElement {
  useEffect(() => {
    document.title = 'URL Shortener Admin'
  }, [])

  return (
    <>
      <h1>URL Shortener Admin</h1>
      <p>Here is where you can manage your URLs.</p>
    </>
  )
}
