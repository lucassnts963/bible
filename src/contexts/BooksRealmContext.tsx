import { ReactNode } from 'react'

import { RealmContext } from '@/services/realm'

interface Props {
  children: ReactNode
}

export const BooksContext = RealmContext

export function BooksContextProvider({ children }: Props) {
  return <BooksContext.RealmProvider>{children}</BooksContext.RealmProvider>
}
