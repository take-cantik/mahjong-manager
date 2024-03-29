import type { ReactNode } from 'react'
import { createContext, useState } from 'react'

import type { User } from '~/shared/types/user'

class AuthContextProps {
  isLogIn = false
  isError = false
  user: User | null | undefined = null
  setUser: (user: User | null) => void = () => {
    //
  }
  refetch: () => Promise<void> = async () => {
    //
  }
}

export const AuthContext = createContext<AuthContextProps>(new AuthContextProps())

type Props = {
  children: ReactNode
}

export const AuthProvider = ({ children }: Props) => {
  const [isLogIn, setLogIn] = useState<boolean>(false)
  const [user, setUserState] = useState<User | null | undefined>(undefined)

  const isError = user === null

  const refetch = async () => {
    if (!user) {
      return
    }
    const _user: User = {
      lineId: user.lineId,
      name: user.name,
      threeRecord: user.threeRecord,
      fourRecord: user.fourRecord
    }
    setUserState(_user)
  }

  const setUser = (value: User | null) => {
    setLogIn(!!value)
    setUserState(value)
  }

  return <AuthContext.Provider value={{ isLogIn, isError, user, setUser, refetch }}>{children}</AuthContext.Provider>
}
