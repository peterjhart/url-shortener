import { ReactElement } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import AdminHome from '../pages/admin/home/AdminHome'

import Links from '../pages/admin/links/Links'
import LinkCreate from '../pages/admin/links/LinkCreate'

export default function AdminApp(): ReactElement {
  return (
    <div className="p-4">
      <nav className="flex flex-row items-center bg-gray-500 rounded-2xl py-1 px-4">
        <h1 className="text-3xl text-white flex-grow font-bold">
          URL Shortener Admin
        </h1>
        <ul className="list-none grid-cols-2 gap-4">
          <li className="inline">
            <Link to="/admin/" className="inline-block p-4">
              Admin
            </Link>
          </li>
          <li className="inline">
            <Link to="/admin/links" className="inline-block p-4">
              Links
            </Link>
          </li>
        </ul>
      </nav>

      <div className="py-8">
        <Routes>
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/links" element={<Links />} />
          <Route path="/admin/links/create" element={<LinkCreate />} />
        </Routes>
      </div>
    </div>
  )
}
