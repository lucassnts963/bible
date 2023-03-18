import { StatusBar } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useTheme, useColorMode } from 'native-base'

import { BooksContextProvider } from '@/contexts'
import { NewTestament, OldTestament } from '@/screens'
import { TabBar } from '@/components'

const Tab = createMaterialTopTabNavigator()

export function PrivateNavigator() {
  const { colors } = useTheme()
  const { colorMode } = useColorMode()

  return (
    <BooksContextProvider>
      <Tab.Navigator
        style={{ paddingTop: StatusBar.currentHeight }}
        screenOptions={{
          tabBarStyle: {
            backgroundColor:
              colorMode === 'dark' ? colors.gray[900] : colors.gray[100],
          },
          tabBarActiveTintColor:
            colorMode === 'dark' ? colors.amber[700] : colors.amber[500],
          tabBarIndicatorStyle: {
            backgroundColor:
              colorMode === 'dark' ? colors.amber[700] : colors.amber[500],
          },
        }}
        tabBar={(props) => <TabBar {...props} />}
      >
        <Tab.Screen
          name="OldTestament"
          component={OldTestament}
          options={{ title: 'Velho Testamento' }}
        />
        <Tab.Screen
          name="NewTestament"
          component={NewTestament}
          options={{ title: 'Novo Testamento' }}
        />
      </Tab.Navigator>
    </BooksContextProvider>
  )
}
