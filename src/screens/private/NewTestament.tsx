import { Background, Testament, Loading } from '@/components'
import { useBooks } from '@/hooks'

export function NewTestament() {
  const { booksNewTestament: books, loaded } = useBooks()

  if (!loaded) return <Loading />

  return (
    <Background>
      <Testament data={books} />
    </Background>
  )
}
