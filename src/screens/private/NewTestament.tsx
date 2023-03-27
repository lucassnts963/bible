import { Background, Loading, Testament } from '@/components'
import { useBooks } from '@/hooks'

export function NewTestament() {
  const { booksNewTestament: books } = useBooks()

  if (!books) return <Loading />

  return (
    <Background>
      <Testament data={books} />
    </Background>
  )
}
