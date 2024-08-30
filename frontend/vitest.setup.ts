import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach, vi } from 'vitest'

afterEach(() => {
  cleanup()
})

beforeEach(() => {
  vi.stubGlobal('fetch', mockFetch())
})

function mockFetch() {
  return vi.fn().mockImplementation(() => {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({}),
    })
  })
}
