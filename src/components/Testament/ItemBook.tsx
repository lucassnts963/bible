import { HStack, Progress, Text, VStack, useColorMode } from 'native-base'

import { Book } from '@/entities'

interface Props {
  data: Book
}

export function ItemBook({ data }: Props) {
  const { progress, title, total } = data

  const { colorMode } = useColorMode()
  return (
    <VStack w="full" space={2}>
      <HStack w="full" justifyContent="space-between">
        <Text>{title}</Text>
        <Text>{total}</Text>
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
