import { NavigationContainer } from '@react-navigation/native'
import { StatusBar, useColorMode, useTheme } from 'native-base'

import { PrivateNavigator } from './private'
import { PublicNavigator } from './public'

import { useAuth } from '@/hooks/useAuth'
import { AuthContextProvider } from '@/contexts'

export function RootNavigator() {
  const { colorMode } = useColorMode()
  const { colors } = useTheme()

  const { user } = useAuth()

  return (
    <NavigationContainer>
      <AuthContextProvider>
        <StatusBar
          translucent
          barStyle={colorMode === 'dark' ? 'light-content' : 'dark-content'}
          backgroundColor={
            colorMode === 'dark' ? colors.gray[900] : colors.gray[100]
          }
          animated={true}
        />
        {!user ? <PrivateNavigator /> : <PublicNavigator />}
      </AuthContextProvider>
    </NavigationContainer>
  )
}
