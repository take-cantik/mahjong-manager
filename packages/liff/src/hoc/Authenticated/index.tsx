import { LiffMockPlugin } from '@line/liff-mock'
import Script from 'next/script'
import { useContext } from 'react'

import { AuthContext } from '~/contexts/AuthContext'
import { UserRepository } from '~/infra/firebase/Repositories/userRepository'

const liffId = process.env.NEXT_PUBLIC_LIFF_ID!

export const Authenticated = () => {
  const { setUser: setUserContext } = useContext(AuthContext)

  const setUser = async (userUid: string): Promise<void> => {
    const userRepository = new UserRepository()
    const user = await userRepository.getUser(userUid)

    if (!user) {
      throw new Error('User Not Found')
    }

    setUserContext({
      lineId: user.lineId,
      name: user.name,
      rate: user.rate
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

        const accessToken = liff.getAccessToken()
        if (!accessToken) {
          throw new Error('Cannot get access token')
        }

        const response: Response = await fetch(`/api/verify/${accessToken}`)
        if (response.status === 401) {
          throw new Error('Unauthenticated')
        }
      }

      const profile = await liff.getProfile()
      setUser(profile.userId)

      console.info(profile)
    } catch (err) {
      handleError(err)
    }
  }

  return <Script src="https://static.line-scdn.net/liff/edge/2/sdk.js" onLoad={() => liffInit()} />
}
