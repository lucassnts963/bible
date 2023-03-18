import { useEffect, useState } from 'react'
import database from '@react-native-firebase/database'

import { Verse, Book } from '@/entities'

export function useBooks(testament: 'antigo' | 'novo') {
  const [loaded, setLoaded] = useState(false)
  const [verses, setVerses] = useState<Verse[]>()
  const [orderBy, setOrderBy] = useState<'timeline' | 'standard'>('standard')
  const [books, setBooks] = useState<Book[]>()

  useEffect(() => {
    const reference = database().ref('/bible')

    reference.once('value').then((snapshot) => {
      const values = snapshot.val() as Verse[]
      setVerses(values)
      setLoaded(true)

      const filtered = values.filter((verse) => verse.testament === testament)

      const grouped = filtered.reduce((acc, verse) => {
        if (!acc[verse.book]) {
          acc[verse.book] = []
        }

        acc[verse.book].push(verse)

        return acc
      }, {})

      const booksTitles = Object.keys(grouped)

      setBooks(
        booksTitles.map((title) => {
          return {
            title,
            verses: grouped[title],
          }
        }),
      )
    })
  }, [testament])

  return {
    books,
    verses,
    orderBy,
    setOrderBy,
    loaded,
  }
}
