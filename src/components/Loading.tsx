import { Spinner, useColorMode } from 'native-base'

import { Background } from './Background'

export function Loading() {
  const { colorMode } = useColorMode()

  return (
    <Background>
      <Spinner color={colorMode === 'dark' ? 'amber.700' : 'amber.500'} />
    </Background>
  )
}
