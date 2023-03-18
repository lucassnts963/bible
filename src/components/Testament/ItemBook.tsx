import { HStack, Progress, Text, VStack, useColorMode } from 'native-base'

import { Book } from '@/entities'

interface Props {
  data: Book
}

export function ItemBook({ data }: Props) {
  const { colorMode } = useColorMode()
  const { title, verses } = data

  const count = verses.length

  const progress = (count / 50) * 100

  return (
    <VStack w="full" space={2}>
      <HStack w="full" justifyContent="space-between">
        <Text>{title}</Text>
        <Text>{count}</Text>
      </HStack>
      <Progress
        w="full"
        value={progress * 100}
        bgColor={colorMode === 'dark' ? 'gray.700' : 'gray.500'}
        mb={2}
        _filledTrack={{
          bg: colorMode === 'dark' ? 'amber.700' : 'amber.500',
        }}
      />
    </VStack>
  )
}
