import { Dimensions, StatusBar } from 'react-native'
import { Center, HStack, Pressable, ScrollView } from 'native-base'
import { useRoute } from '@react-navigation/native'

import { BookScreenRouteProps } from '@/routes'
import { Background } from '@/components'
import { useBooks } from '@/hooks'

export function BookScreen() {
  const { params } = useRoute<BookScreenRouteProps>()
  const { chapters } = params

  const { markAsReadByChapter } = useBooks()

  const itemSize = 50

  const screenWidth = Dimensions.get('window').width
  const itemsPerRow = Math.floor(screenWidth / itemSize)
  const itemSpacing = (screenWidth - itemSize * itemsPerRow) / (itemsPerRow + 1)

  return (
    <Background pt={StatusBar.currentHeight}>
      <ScrollView>
        <HStack flexWrap="wrap" justifyContent="center">
          {chapters.map((chapter) => {
            return (
              <Pressable
                key={chapter.code}
                onPress={() => markAsReadByChapter(chapter.code)}
              >
                <Center
                  w={itemSize}
                  h={itemSize}
                  m={itemSpacing + 2}
                  mb={itemSpacing + 2}
                  bgColor={chapter.read ? 'amber.500' : 'gray.200'}
                  _dark={{ bgColor: chapter.read ? 'amber.700' : 'gray.600' }}
                  rounded="lg"
                >
                  {chapter.code}
                </Center>
              </Pressable>
            )
          })}
        </HStack>
      </ScrollView>
    </Background>
  )
}
