import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'

import { BooksContextProvider, BooksRealmContextProvider } from '@/contexts'
import { HomeScreen, BookScreen } from '@/screens'
import { Chapter } from '@/entities'
import { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

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

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('@storage_Key')
    if (value !== null) {
      console.log('loaded: ', value)
    } else {
      console.log('not found!')
    }
  } catch (e) {
    console.log(e)
  }
}

export function PrivateNavigator() {
  useEffect(() => {
    getData()
  }, [])

  return (
    <BooksRealmContextProvider>
      <BooksContextProvider>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Home"
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Book" component={BookScreen} />
        </Stack.Navigator>
      </BooksContextProvider>
    </BooksRealmContextProvider>
  )
}
