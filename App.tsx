import React from 'react'
import { NativeBaseProvider } from 'native-base'

import database from '@react-native-firebase/database'

import { RootNavigator } from '@/routes'
import { ToggleColorMode } from '@/components'

database().setPersistenceEnabled(true)

export default function App() {
  return (
    <NativeBaseProvider>
      <RootNavigator />
      <ToggleColorMode />
    </NativeBaseProvider>
  )
}
