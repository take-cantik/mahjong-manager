import { LiffMockPlugin } from '@line/liff-mock'
import { onAuthStateChanged, signInWithCustomToken } from 'firebase/auth'
import { httpsCallable } from 'firebase/functions'
import Script from 'next/script'
import { useContext } from 'react'

import { AuthContext } from '~/contexts/AuthContext'
import { auth, functions } from '~/infra/firebase'
import { UserRepository } from '~/infra/firebase/Repositories/userRepository'
import { NEXT_PUBLIC_LIFF_ID } from '~/utils/secret'

export const Authenticated = () => {
  const { setUser: setUserContext } = useContext(AuthContext)

  const login = async (): Promise<void> => {
    console.info('4')
    const idToken = liff.getIDToken()!
    console.info('5', idToken)
    const [lineChannelId, _] = NEXT_PUBLIC_LIFF_ID.split('-')
    console.info('6', lineChannelId)
    const profile = await liff.getProfile()

    console.info('4', profile)

    const verify = httpsCallable(functions, 'auth')
    const response: any = await verify({
      idToken,
      lineChannelId,
      uid: profile.userId
    })

    console.info('5', response)

    const token = response.data.token

    await signInWithCustomToken(auth, token)
  }

  const setUser = async (userUid: string): Promise<void> => {
    const userRepository = new UserRepository()
    const user = await userRepository.getUser(userUid)

    if (!user) {
      throw new Error('User Not Found')
    }

    setUserContext({
      lineId: user.lineId,
      name: user.name,
      threeRecord: user.threeRecord,
      fourRecord: user.fourRecord
    })
  }

  const handleError = (err: any) => {
    console.error(err)
    setUserContext(null)
  }

  const liffInit = async () => {
    try {
      console.info('1', NEXT_PUBLIC_LIFF_ID)
      if (process.env.NODE_ENV === 'development') {
        liff.use(new LiffMockPlugin())
        await liff.init({ liffId: NEXT_PUBLIC_LIFF_ID, mock: true })
        liff.login()
      } else {
        console.info('2', NEXT_PUBLIC_LIFF_ID)
        await liff.init({ liffId: NEXT_PUBLIC_LIFF_ID })
      }

      console.info('3', NEXT_PUBLIC_LIFF_ID)

      await login()

      onAuthStateChanged(
        auth,
        async (user) => {
          try {
            if (user) {
              await setUser(user.uid)
            }
          } catch (err) {
            handleError(err)
          }
        },
        (err) => handleError(err)
      )
    } catch (err) {
      handleError(err)
    }
  }

  return <Script src="https://static.line-scdn.net/liff/edge/2/sdk.js" onLoad={() => liffInit()} />
}
