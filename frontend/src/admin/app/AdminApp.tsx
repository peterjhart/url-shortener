import { ReactElement } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import AdminHome from '../home/AdminHome'

import Links from '../links/Links'
import LinkCreate from '../links/LinkCreate'

export default function AdminApp(): ReactElement {
  return (
    <div>
      <nav>
        <li>
          <Link to="/">Admin</Link>
        </li>
        <li>
          <Link to="/links">Links</Link>
        </li>
      </nav>

      <Routes>
        <Route path="/" element={<AdminHome />} />
        <Route path="/links" element={<Links />} />
        <Route path="/links/create" element={<LinkCreate />} />
      </Routes>
    </div>
  )
}
