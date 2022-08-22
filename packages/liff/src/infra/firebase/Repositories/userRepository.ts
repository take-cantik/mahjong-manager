import { doc, getDoc } from 'firebase/firestore'

import { firestore } from '..'

export class UserRepository {
  async getUser(lineId: string): Promise<object | null> {
    const response = await getDoc(doc(firestore, 'users', lineId))

    if (!response.exists()) {
      return null
    }

    return {
      lineId: response.data().lineId,
      name: response.data().name,
      rate: response.data().rate
    }
  }
}
