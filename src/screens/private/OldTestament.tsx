import { useMemo } from 'react'

import { Background, Testament } from '@/components'
import { Book } from '@/entities'

export function OldTestament() {
  const books: Book[] = useMemo(
    () => [
      {
        id: '4327849jer43kj',
        progress: 0.06,
        total: 50,
        title: 'Genesis',
      },
      {
        id: '4327859jer43kj',
        progress: 0.06,
        total: 31,
        title: 'Êxodo',
      },
    ],
    [],
  )
  return (
    <Background>
      <Testament data={books} />
    </Background>
  )
}
