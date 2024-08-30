import { ShortenedLink } from '@/lib/api/api'
import { ReactElement } from 'react'

interface LinkListProps {
  links: ShortenedLink[]
}
export default function LinkList({ links }: LinkListProps): ReactElement {
  return (
    <table className="table-auto w-full bg-gray-100">
      <thead className="bg-gray-300">
        <tr>
          <th className="bg-gray-300 rounded-tl-md text-left">Alias</th>
          <th className="bg-gray-300 rounded-tr-md text-left">Link</th>
        </tr>
      </thead>
      <tbody>
        {links.map((shortenedLink) => (
          <LinkListRow key={shortenedLink.id} link={shortenedLink} />
        ))}
      </tbody>
    </table>
  )
}

interface LinkListRowProps {
  link: ShortenedLink
}

function LinkListRow({ link }: LinkListRowProps): ReactElement {
  return (
    <tr className="border border-t-0">
      <td>{link.alias}</td>
      <td>{link.url}</td>
    </tr>
  )
}
