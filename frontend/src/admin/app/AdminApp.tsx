import { ReactElement } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import AdminHome from '../home/AdminHome'

import Links from '../links/Links'
import LinkCreate from '../links/LinkCreate'

export default function AdminApp(): ReactElement {
  return (
    <div>
      <h1>URL Shortener Admin</h1>
      <nav>
        <li>
          <Link to="/admin/">Admin</Link>
        </li>
        <li>
          <Link to="/admin/links">Links</Link>
        </li>
      </nav>

      <Routes>
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/links" element={<Links />} />
        <Route path="/admin/links/create" element={<LinkCreate />} />
      </Routes>
    </div>
  )
}
