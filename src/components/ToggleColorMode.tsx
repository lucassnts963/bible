import { Fab, MoonIcon, SunIcon, useColorMode } from 'native-base'

export function ToggleColorMode() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Fab
      onPress={toggleColorMode}
      position="absolute"
      bottom={5}
      right={5}
      bgColor={colorMode === 'dark' ? 'amber.700' : 'amber.500'}
      icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
      _icon={{
        _dark: { color: 'gray.900' },
        _light: { color: 'gray.100' },
      }}
    />
  )
}
