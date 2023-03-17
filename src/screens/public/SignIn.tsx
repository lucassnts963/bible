import { Heading, Image } from 'native-base'

import { GoogleSigninButton } from '@react-native-google-signin/google-signin'

import { Background } from '@/components'

import logo from '@/assets/logo.png'
import { useAuth } from '@/hooks/useAuth'
import { Loading } from '@/components/Loading'

export function SignInScreen() {
  const { initializing, signIn } = useAuth()

  if (initializing) return <Loading />

  return (
    <Background
      px={5}
      space={10}
      type="VStack"
      alignItems="center"
      justifyContent="center"
    >
      <Image source={logo} alt="Logo" w={100} h={100} />
      <Heading>Bem Vindo, ao Bíblia em Foco</Heading>
      <GoogleSigninButton
        style={{ width: '100%', height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        onPress={() =>
          signIn().then(() => console.log('Signed in with Google!'))
        }
        disabled={initializing}
      />
    </Background>
  )
}
