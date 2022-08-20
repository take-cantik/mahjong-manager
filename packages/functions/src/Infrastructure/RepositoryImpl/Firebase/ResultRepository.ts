import { Result } from '~/Domains/Entities/Result'
import { ResultRepositoryInterface } from '~/Domains/Reopsitories/ResultRepository'
import { db } from '~/utils/firebase'
import { errorLogger } from '~/utils/util'

export class ResultRepository implements ResultRepositoryInterface {
  async getResult(docId: string): Promise<Result> {
    try {
      const res = await db.collection('result').doc(docId).get()
      const doc = res.data()

      if (!doc) throw new Error()

      return {
        id: res.id,
        time: doc.time,
        people: doc.people,
        round: doc.round,
        participantIdList: doc.participantIdList,
        scoreList: doc.scoreList
      }
    } catch (err) {
      errorLogger(err)
      throw new Error('getResult')
    }
  }

  async setTime(time: string): Promise<string> {
    try {
      const doc = db.collection('result').doc()
      await doc.set({ time, participantIdList: [], scoreList: [] })
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

  async deleteResult(docId: string): Promise<void> {
    try {
      await db.collection('result').doc(docId).delete()
    } catch (err) {
      errorLogger(err)
      throw new Error('deleteResult')
    }
  }
}
