import { createStackNavigator } from '@react-navigation/stack'

import { SignInScreen } from '@/screens'

const Stack = createStackNavigator()

export function PublicNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ title: 'Login' }}
      />
    </Stack.Navigator>
  )
}
