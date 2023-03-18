import { useContext } from 'react'

import { BooksContext } from '@/contexts'

export function useBooks() {
  return useContext(BooksContext)
}
