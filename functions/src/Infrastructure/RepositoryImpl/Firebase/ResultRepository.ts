import { ResultRepositoryInterface } from '~/Domains/Reopsitories/ResultRepository'
import { db } from '~/utils/firebase'
import { errorLogger } from '~/utils/util'

export class RedsultRepository implements ResultRepositoryInterface {
  async getRecentDocId(): Promise<string> {
    try {
      const res = await db.collection('result').orderBy('time', 'desc').limit(1).get()
      return res.docs[0].id
    } catch (err) {
      errorLogger(err)
      throw new Error('getRecentDocId')
    }
  }

  async setTime(docId: string, time: string): Promise<void> {
    try {
      await db.collection('result').doc(docId).update({ time: time })
    } catch (err) {
      errorLogger(err)
      throw new Error('setTime')
    }
  }

  async setPeople(docId: string, people: 3 | 4): Promise<void> {
    try {
      await db.collection('result').doc(docId).update({ people: people })
    } catch (err) {
      errorLogger(err)
      throw new Error('setPeople')
    }
  }

  async setRound(docId: string, round: 1 | 2): Promise<void> {
    try {
      await db.collection('result').doc(docId).update({ round })
    } catch (err) {
      errorLogger(err)
      throw new Error('setRound')
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
