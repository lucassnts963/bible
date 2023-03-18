import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'

import { BooksContextProvider } from '@/contexts'
import { HomeScreen, BookScreen } from '@/screens'
import { Chapter } from '@/entities'

export type RootStackParamList = {
  Home: undefined
  Book: { chapters: Chapter[] }
}

export type BookScreenNavigationProps = StackNavigationProp<
  RootStackParamList,
  'Book'
>

export type BookScreenRouteProps = RouteProp<RootStackParamList, 'Book'>

const Stack = createStackNavigator<RootStackParamList>()

export function PrivateNavigator() {
  return (
    <BooksContextProvider>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Home"
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Book" component={BookScreen} />
      </Stack.Navigator>
    </BooksContextProvider>
  )
}
