import { PostbackRepositoryInterface } from '~/Domains/Reopsitories/PostbackRepository'
import { db } from '~/utils/firebase'
import { errorLogger } from '~/utils/util'

export class PostbackRepository implements PostbackRepositoryInterface {
  async addPostback(uuid: string, lineId: string): Promise<void> {
    try {
      await db.collection('postback').doc(uuid).set({ uuid, lineId })
    } catch (err) {
      errorLogger(err)
      throw new Error('getUser')
    }
  }

  async existPostback(uuid: string): Promise<boolean> {
    const res = await db.collection('postback').doc(uuid).get()

    return !!res.data()
  }
}
