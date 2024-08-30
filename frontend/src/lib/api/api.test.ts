import { describe, expect, it, vi } from 'vitest'
import { createLink, getLinks, ShortenedLink } from './api'

describe('API', () => {
  describe('createLink', () => {
    const URL = '/api/links'

    it('sends a link with an alias', async () => {
      const expectedBody = { alias: '## ALIAS ##', url: '## LINK ##' }
      const expectedOptions = {
        method: 'POST',
        headers: {},
        body: JSON.stringify(expectedBody),
      }

      const result = await createLink('## LINK ##', '## ALIAS ##')
      expect(global.fetch).toHaveBeenCalledWith(URL, expectedOptions)
      expect(result).toBeUndefined()
    })

    it('sends a link without an alias', async () => {
      const expectedBody = { alias: '', url: '## LINK ##' }
      const expectedOptions = {
        method: 'POST',
        headers: {},
        body: JSON.stringify(expectedBody),
      }

      const result = await createLink('## LINK ##', '')
      expect(global.fetch).toHaveBeenCalledWith(URL, expectedOptions)
      expect(result).toBeUndefined()
    })
  })

  describe('getLinks', () => {
    const URL = '/api/links'

    it('returns a list of links', async () => {
      const expectedOptions = {
        method: 'GET',
      }
      const links: ShortenedLink[] = [
        { id: 'abc', alias: '## ALIAS ONE ##', url: '## URL ONE ##' },
        { id: 'def', alias: '## ALIAS TWO ##', url: '## URL TWO ##' },
      ]

      vi.mocked(global.fetch).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve([...links]),
      } as Response)

      const result = await getLinks()
      expect(global.fetch).toHaveBeenCalledWith(URL, expectedOptions)
      expect(result).toEqual([...links])
    })
  })
})
