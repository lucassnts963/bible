import { Center, FlatList } from 'native-base'
import { useRoute } from '@react-navigation/native'

import { BookScreenRouteProps } from '@/routes'
import { Background } from '@/components'
import { StatusBar } from 'react-native'

export function BookScreen() {
  const { params } = useRoute<BookScreenRouteProps>()

  const { chapters } = params

  const itemSize = 20

  return (
    <Background pt={StatusBar.currentHeight}>
      <FlatList
        flex={1}
        numColumns={4}
        data={chapters}
        keyExtractor={(item) => String(item.code)}
        renderItem={({ item }) => (
          <Center
            w={itemSize}
            h={itemSize}
            m={2}
            bgColor="amber.500"
            _dark={{ bgColor: 'amber.700' }}
            rounded="lg"
          >
            {item.code}
          </Center>
        )}
      />
    </Background>
  )
}
