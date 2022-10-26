import { doc, getDoc } from 'firebase/firestore'

import type { User } from '~/shared/types/user'

import { firestore } from '..'

export class UserRepository {
  async getUser(lineId: string): Promise<User | null> {
    const response = await getDoc(doc(firestore, 'users', lineId))

    if (!response.exists()) {
      return null
    }

    return {
      lineId: response.data().lineId,
      name: response.data().name,
      threeRecord: response.data().threeRecord,
      fourRecord: response.data().fourRecord
    }
  }
}
