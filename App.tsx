import React from 'react'
import { NativeBaseProvider } from 'native-base'

import { RootNavigator } from '@/routes'
import { ToggleColorMode } from '@/components'

export default function App() {
  return (
    <NativeBaseProvider>
      <RootNavigator />
      <ToggleColorMode />
    </NativeBaseProvider>
  )
}
