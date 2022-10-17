import { LiffMockPlugin } from '@line/liff-mock'
import { getAuth, onAuthStateChanged, signInWithCustomToken } from 'firebase/auth'
import Script from 'next/script'
import { useContext } from 'react'

import { AuthContext } from '~/contexts/AuthContext'
import { UserRepository } from '~/infra/firebase/Repositories/userRepository'

const liffId = process.env.NEXT_PUBLIC_LIFF_ID!

export const Authenticated = () => {
  const auth = getAuth()
  const { setUser: setUserContext } = useContext(AuthContext)

  const login = async (): Promise<void> => {
    const accessToken = liff.getAccessToken()
    if (!accessToken) {
      throw new Error('Cannot get access token')
    }

    // functionsの呼び出し

    await signInWithCustomToken(auth, accessToken)
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
      if (process.env.NODE_ENV === 'development') {
        liff.use(new LiffMockPlugin())
        await liff.init({ liffId, mock: true })
        liff.login()
      } else {
        await liff.init({ liffId })
        await login()
      }

      onAuthStateChanged(
        auth,
        async (user) => {
          try {
            if (user) {
              const profile = await liff.getProfile()
              await setUser(profile.userId)
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
