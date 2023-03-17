import { createContext, ReactNode, useEffect, useState } from 'react'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

GoogleSignin.configure({
  webClientId: process.env.CLIENT_ID,
})

interface AuthState {
  user: FirebaseAuthTypes.User | null
  signIn: () => Promise<FirebaseAuthTypes.UserCredential> | null
  signOut: () => Promise<void>
  initializing: boolean
}

interface Props {
  children: ReactNode
}

export const AuthContext = createContext<AuthState>({
  user: null,
  signIn: null,
  signOut: null,
  initializing: false,
})

export function AuthContextProvider({ children }: Props) {
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState<FirebaseAuthTypes.User>()

  function onAuthStateChanged(user: FirebaseAuthTypes.User) {
    setUser(user)
    if (initializing) setInitializing(false)
  }

  async function signIn() {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })

    const { idToken } = await GoogleSignin.signIn()

    const googleCredential = auth.GoogleAuthProvider.credential(idToken)

    return auth().signInWithCredential(googleCredential)
  }

  async function signOut() {
    await GoogleSignin.signOut()
    await auth().signOut()
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber // unsubscribe on unmount
  })

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, initializing }}>
      {children}
    </AuthContext.Provider>
  )
}
