import { collection, doc, getDoc, getDocs, query } from 'firebase/firestore'

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

  async getUserList(): Promise<User[]> {
    const response = await getDocs(query(collection(firestore, 'users')))

    const userList: User[] = []

    response.forEach((doc) => {
      userList.push({
        lineId: doc.data().lineId,
        name: doc.data().name,
        threeRecord: doc.data().threeRecord,
        fourRecord: doc.data().fourRecord
      })
    })

    return userList
  }
}
