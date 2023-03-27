import {
  HStack,
  Pressable,
  Progress,
  Text,
  VStack,
  useColorMode,
} from 'native-base'

import { Book } from '@/entities'
import { useNavigation } from '@react-navigation/native'

import { BookScreenNavigationProps } from '@/routes'

interface Props {
  data: Book
}

export function ItemBook({ data }: Props) {
  const { colorMode } = useColorMode()
  const { title, chapters } = data

  const navigation = useNavigation<BookScreenNavigationProps>()

  const count = chapters.length

  const progress = (count / 50) * 100

  function handleSelected() {
    navigation.navigate('Book', { chapters })
  }

  return (
    <Pressable onPress={handleSelected}>
      <VStack w="full" space={2}>
        <HStack w="100%" justifyContent="space-between">
          <Text>{title}</Text>
          <Text>{count}</Text>
        </HStack>
        <Progress
          w="100%"
          size="lg"
          value={progress}
          bgColor={colorMode === 'dark' ? 'gray.700' : 'gray.500'}
          mb={2}
          _filledTrack={{
            bg: colorMode === 'dark' ? 'amber.700' : 'amber.500',
          }}
        />
        <Text position="absolute" left="50%" top="45%">
          {progress.toFixed(0)}%
        </Text>
      </VStack>
    </Pressable>
  )
}
