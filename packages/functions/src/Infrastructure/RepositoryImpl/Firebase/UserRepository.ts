import { User } from '~/Domains/Entities/User'
import { UserRepositoryInterface } from '~/Domains/Reopsitories/UserRepository'
import { db } from '~/utils/firebase'
import { errorLogger } from '~/utils/util'

export class UserRepository implements UserRepositoryInterface {
  async getUser(lineId: string): Promise<User | null> {
    try {
      const res = await db.collection('users').doc(lineId).get()
      const data = res.data()
      if (data) {
        return {
          lineId: data.lineId,
          name: data.name,
          threeRecord: data.threeRecord,
          fourRecord: data.fourRecord
        }
      }

      return null
    } catch (err) {
      errorLogger(err)
      throw new Error('getUser')
    }
  }

  async addUser(user: User): Promise<void> {
    try {
      await db.collection('users').doc(user.lineId).set(user)
    } catch (err) {
      errorLogger(err)
      throw new Error('addUser')
    }
  }

  async updateRate(user: User): Promise<void> {
    try {
      await db.collection('users').doc(user.lineId).update({
        threeRecord: user.threeRecord,
        fourRecord: user.fourRecord
      })
    } catch (err) {
      errorLogger(err)
      throw new Error('updateRate')
    }
  }
}
