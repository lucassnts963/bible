import { Center, HStack, IStackProps, VStack } from 'native-base'

interface Props extends IStackProps {
  type?: 'Center' | 'VStack' | 'HStack'
}

export function Background({ children, type = 'Center', ...rest }: Props) {
  const Container =
    type === 'Center' ? Center : type === 'VStack' ? VStack : HStack

  return (
    <Container
      flex={1}
      px={2}
      bgColor="gray.100"
      _dark={{ bgColor: 'gray.900' }}
      {...rest}
    >
      {children}
    </Container>
  )
}
