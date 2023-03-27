import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react'

import { Book, Chapter, Verse } from '@/entities'
import { useVerses } from '@/hooks/useVerses'

interface Props {
  children: ReactNode
}

interface BooksState {
  booksOldTestament: Book[]
  booksNewTestament: Book[]
  verses: Verse[]
  orderBy: 'timeline' | 'standard'
  setOrderBy: Dispatch<SetStateAction<'standard' | 'timeline'>>
  error?: string
  markAsReadByChapter: (code: number) => void
}

function groupBy<T>(values: T[], key: string) {
  const grouped = values.reduce((acc, verse) => {
    if (!acc[verse[key]]) {
      acc[verse[key]] = []
    }

    acc[verse[key]].push(verse)

    return acc
  }, {})

  return grouped
}

function getKeys(groupedObject: Object) {
  return Object.keys(groupedObject)
}

function filter(values: Verse[], testament: 'antigo' | 'novo'): Book[] {
  const filtered = values.filter((verse) => verse.testament === testament)

  const grouped = groupBy(filtered, 'book')

  const booksTitles = getKeys(grouped)

  return booksTitles.map((title) => {
    const groupedByChapter = groupBy(grouped[title], 'chapter')

    const chaptersNumbers = getKeys(groupedByChapter)

    const chapters = chaptersNumbers.map((chapter) => {
      const verses = groupedByChapter[chapter]
      const read = verses.every((verse) => verse.read)
      return {
        code: Number(chapter),
        verses,
        read,
      } as Chapter
    })

    return {
      title,
      chapters,
    }
  })
}

export const BooksContext = createContext<BooksState>({
  booksOldTestament: null,
  booksNewTestament: null,
  verses: null,
  orderBy: 'standard',
  setOrderBy: () => {},
  error: '',
  markAsReadByChapter: () => {},
})

export function BooksContextProvider({ children }: Props) {
  const [orderBy, setOrderBy] = useState<'timeline' | 'standard'>('standard')
  const [booksOldTestament, setBooksOldTestament] = useState<Book[]>()
  const [booksNewTestament, setBooksNewTestament] = useState<Book[]>()

  const { verses, markVersesAsRead } = useVerses()

  function markAsReadByChapter(chapterCode: number) {
    const verseToMark = verses.filter((verse) => verse.chapter === chapterCode)

    markVersesAsRead(verseToMark)
  }

  useEffect(() => {
    const oldTestament = filter(verses, 'antigo')
    const newTestament = filter(verses, 'novo')

    setBooksOldTestament(oldTestament)

    setBooksNewTestament(newTestament)
  }, [verses])

  return (
    <BooksContext.Provider
      value={{
        booksOldTestament,
        booksNewTestament,
        orderBy,
        setOrderBy,
        verses,
        markAsReadByChapter,
      }}
    >
      {children}
    </BooksContext.Provider>
  )
}
