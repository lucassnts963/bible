import { StatusBar } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useTheme, useColorMode } from 'native-base'

import { NewTestament, OldTestament } from '@/screens'

const Tab = createMaterialTopTabNavigator()

export function PrivateNavigator() {
  const { colors } = useTheme()
  const { colorMode } = useColorMode()

  return (
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
  )
}
