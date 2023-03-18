import { FlatList } from 'native-base'

import { Book } from '@/entities'
import { ItemBook } from './ItemBook'

interface Props {
  data: Book[]
}

export function Testament({ data }: Props) {
  return (
    <FlatList
      w="full"
      pt={2}
      px={2}
      data={data}
      renderItem={({ item }) => <ItemBook data={item} />}
      keyExtractor={(item) => item.title}
    />
  )
}
