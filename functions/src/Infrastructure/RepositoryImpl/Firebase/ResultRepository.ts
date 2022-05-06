import { ResultRepositoryInterface } from '~/Domains/Reopsitories/ResultRepository'
import { db } from '~/utils/firebase'
import { errorLogger } from '~/utils/util'

export class ResultRepository implements ResultRepositoryInterface {
  async getRecentDocId(): Promise<string> {
    try {
      const res = await db.collection('result').orderBy('time', 'desc').limit(1).get()
      return res.docs[0].id
    } catch (err) {
      errorLogger(err)
      throw new Error('getRecentDocId')
    }
  }

  async setTime(time: string): Promise<string> {
    try {
      const doc = db.collection('result').doc()
      await doc.set({ time })
      return doc.id
    } catch (err) {
      errorLogger(err)
      throw new Error('setTime')
    }
  }

  async setGame(docId: string, people: 3 | 4, round: 1 | 2): Promise<void> {
    try {
      await db.collection('result').doc(docId).update({ people, round })
    } catch (err) {
      errorLogger(err)
      throw new Error('setPeople')
    }
  }

  async setScore(docId: string, participantIdList: string[], scoreList: number[]): Promise<void> {
    try {
      await db.collection('result').doc(docId).update({
        participantIdList,
        scoreList
      })
    } catch (err) {
      errorLogger(err)
      throw new Error('setScore')
    }
  }
}
