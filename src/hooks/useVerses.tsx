import { useEffect, useState } from 'react'

import { Verse } from '@/entities'

import bible from '@/assets/bible/biblia_almeida_completa.json'

export function useVerses() {
  const [verses, setVerses] = useState<Verse[]>([])

  function markVersesAsRead(versesToMark: Verse[]) {
    setVerses((previousState) => {
      return previousState.map((verse) => {
        const hasToMark = versesToMark.some((v) => v.code === verse.code)
        if (hasToMark) {
          return {
            ...verse,
            read: true,
          }
        } else {
          return {
            ...verse,
          }
        }
      })
    })
  }

  useEffect(() => {
    setVerses(bible as Verse[])
  }, [])

  return { verses, markVersesAsRead }
}
