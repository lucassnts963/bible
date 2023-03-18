import {
  HStack,
  Pressable,
  Progress,
  Text,
  VStack,
  useColorMode,
} from 'native-base'

import { Book, Chapter } from '@/entities'
import { useCallback, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import { BookScreenNavigationProps } from '@/routes'

interface Props {
  data: Book
}

export function ItemBook({ data }: Props) {
  const [count, setCount] = useState(0)
  const [chapters, setChapters] = useState<Chapter[]>()
  const { colorMode } = useColorMode()
  const { title, verses } = data

  const navigation = useNavigation<BookScreenNavigationProps>()

  const fetchChapters = useCallback(() => {
    const grouped = verses.reduce((acc, verse) => {
      if (!acc[verse.chapter]) {
        acc[verse.chapter] = []
      }

      acc[verse.chapter].push(verse)

      return acc
    }, {})

    const chaptersCodes = Object.keys(grouped)

    setCount(chaptersCodes.length)

    setChapters(
      chaptersCodes.map((key) => {
        return {
          code: Number(key),
          verses: grouped[key],
        }
      }),
    )
  }, [verses])

  const progress = (count / 50) * 100

  function handleSelected() {
    navigation.navigate('Book', { chapters })
  }

  useEffect(() => {
    fetchChapters()
  }, [fetchChapters])

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
