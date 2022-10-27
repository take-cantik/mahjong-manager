import { useEffect, useState } from 'react'

import { UserRepository } from '~/infra/firebase/Repositories/userRepository'
import type { User } from '~/shared/types/user'

export const useUserList = () => {
  const [userList, setUserList] = useState<User[]>([])

  useEffect(() => {
    ;(async () => {
      const userRepository = new UserRepository()
      const userList = await userRepository.getUserList()

      setUserList(userList)
    })()
  }, [])

  return { userList }
}
