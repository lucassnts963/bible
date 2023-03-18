import { Background, Testament, Loading } from '@/components'
import { useBooks } from '@/hooks'

export function OldTestament() {
  const { booksOldTestament: books, loaded } = useBooks()

  if (!loaded) return <Loading />

  return (
    <Background>
      <Testament data={books} />
    </Background>
  )
}
