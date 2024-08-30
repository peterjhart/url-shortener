import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import LinkList from './link-list'

describe('LinkList', () => {
  describe('Snapshots', () => {
    it('matches snapshot', () => {
      const links = [
        { id: '## ONE ##', alias: '## ALIAS ONE ##', url: '## URL ONE ##' },
        { id: '## TWO ##', alias: '## ALIAS TWO ##', url: '## URL TWO ##' },
        {
          id: '## THREE ##',
          alias: '## ALIAS THREE ##',
          url: '## URL THREE ##',
        },
      ]
      const { asFragment } = render(<LinkList links={links} />)

      expect(asFragment()).toMatchSnapshot()
    })
  })
})
