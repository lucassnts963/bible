import { Animated } from 'react-native'
import {
  HStack,
  IconButton,
  Pressable,
  VStack,
  useColorMode,
  useTheme,
  ChevronDownIcon,
  Text,
  Heading,
} from 'native-base'
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs'

interface Props extends MaterialTopTabBarProps {}

export function TabBar({
  descriptors,
  jumpTo,
  layout,
  navigation,
  position,
  state,
}: Props) {
  const { colors } = useTheme()
  const { colorMode } = useColorMode()

  function handleModalOptions() {
    console.log('handleModalOptions')
  }

  return (
    <VStack bgColor="gray.100" _dark={{ bgColor: 'gray.900' }} w="full">
      <HStack w="full" alignItems="center" justifyContent="space-between">
        <HStack
          flex={1}
          alignItems="center"
          justifyContent="space-between"
          p={5}
        >
          <Heading>Leitura Bíblica</Heading>
          <VStack>
            <Text fontSize="sm">Inciada em</Text>
            <Text fontSize="sm">24/12/2022</Text>
          </VStack>
        </HStack>
        <IconButton
          icon={<ChevronDownIcon />}
          _icon={{ color: 'amber.500', _dark: { color: 'amber.700' } }}
          _pressed={{ bgColor: 'amber.600', _dark: { bgColor: 'amber.800' } }}
          rounded="full"
          onPress={handleModalOptions}
          mr={2}
        />
      </HStack>
      <HStack>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key]

          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name

          const isFocused = state.index === index

          function onPress() {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            })

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name)
            }
          }

          function onLongPress() {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            })
          }

          const inputRange = state.routes.map((_, i) => i)
          const opacity = position.interpolate({
            inputRange,
            outputRange: inputRange.map((i) => (i === index ? 1 : 0.5)),
          })

          const opacityBorder = position.interpolate({
            inputRange,
            outputRange: inputRange.map((i) => (i === index ? 1 : 0)),
          })

          const darkColor = colors.amber[700]
          const lightColor = colors.amber[500]

          return (
            <Pressable
              key={index}
              w="full"
              flex={1}
              alignItems="center"
              justifyContent="center"
              onPress={onPress}
              onLongPress={onLongPress}
            >
              <Animated.Text
                style={{
                  opacity,
                  padding: 10,
                  color: colorMode === 'dark' ? darkColor : lightColor,
                }}
              >
                {label as string}
              </Animated.Text>
              <Animated.View
                style={{
                  borderBottomColor:
                    colorMode === 'dark' ? darkColor : lightColor,
                  borderBottomWidth: 2,
                  width: '100%',
                  opacity: opacityBorder,
                }}
              />
            </Pressable>
          )
        })}
      </HStack>
    </VStack>
  )
}
