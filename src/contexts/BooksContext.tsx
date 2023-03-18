import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react'

import database from '@react-native-firebase/database'

import { Book, Verse } from '@/entities'

interface Props {
  children: ReactNode
}

interface BooksState {
  booksOldTestament: Book[]
  booksNewTestament: Book[]
  verses: Verse[]
  orderBy: 'timeline' | 'standard'
  setOrderBy: Dispatch<SetStateAction<'standard' | 'timeline'>>
  loaded: boolean
}

function filter(values: Verse[], testament: 'antigo' | 'novo'): Book[] {
  const filtered = values.filter((verse) => verse.testament === testament)

  const grouped = filtered.reduce((acc, verse) => {
    if (!acc[verse.book]) {
      acc[verse.book] = []
    }

    acc[verse.book].push(verse)

    return acc
  }, {})

  const booksTitles = Object.keys(grouped)

  return booksTitles.map((title) => {
    return {
      title,
      verses: grouped[title],
    }
  })
}

export const BooksContext = createContext<BooksState>({
  booksOldTestament: null,
  booksNewTestament: null,
  verses: null,
  orderBy: 'standard',
  setOrderBy: () => {},
  loaded: false,
})

export function BooksContextProvider({ children }: Props) {
  const [loaded, setLoaded] = useState(false)
  const [verses, setVerses] = useState<Verse[]>()
  const [orderBy, setOrderBy] = useState<'timeline' | 'standard'>('standard')
  const [booksOldTestament, setBooksOldTestament] = useState<Book[]>()
  const [booksNewTestament, setBooksNewTestament] = useState<Book[]>()

  useEffect(() => {
    const reference = database().ref('/bible')

    reference.once('value').then((snapshot) => {
      const values = snapshot.val() as Verse[]
      setVerses(values)
      setLoaded(true)

      const oldTestament = filter(values, 'antigo')
      const newTestament = filter(values, 'novo')

      setBooksOldTestament(oldTestament)

      setBooksNewTestament(newTestament)
    })
  }, [])

  return (
    <BooksContext.Provider
      value={{
        booksOldTestament,
        booksNewTestament,
        verses,
        orderBy,
        setOrderBy,
        loaded,
      }}
    >
      {children}
    </BooksContext.Provider>
  )
}
