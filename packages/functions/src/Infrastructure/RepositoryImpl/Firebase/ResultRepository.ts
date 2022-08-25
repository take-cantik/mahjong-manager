import { firestore } from 'firebase-admin'
import { Result, ScoreResult } from '~/Domains/Entities/Result'
import { ResultRepositoryInterface } from '~/Domains/Reopsitories/ResultRepository'
import { db } from '~/utils/firebase'
import { errorLogger } from '~/utils/util'

export class ResultRepository implements ResultRepositoryInterface {
  async getResult(docId: string): Promise<Result> {
    try {
      const res = await db.collection('results').doc(docId).get()
      const doc = res.data()

      if (!doc) throw new Error()

      return {
        time: doc.time.seconds,
        people: doc.people,
        round: doc.round,
        scoreList: doc.scoreList
      }
    } catch (err) {
      errorLogger(err)
      throw new Error('getResult')
    }
  }

  async setTime(time: string): Promise<string> {
    try {
      const firestoreTime = firestore.Timestamp.fromDate(new Date(time))
      const doc = db.collection('results').doc(String(firestoreTime.seconds))
      await doc.set({ time: firestoreTime, scoreList: [] })
      return doc.id
    } catch (err) {
      errorLogger(err)
      throw new Error('setTime')
    }
  }

  async setGame(docId: string, people: 3 | 4, round: 1 | 2): Promise<void> {
    try {
      await db.collection('results').doc(docId).update({ people, round })
    } catch (err) {
      errorLogger(err)
      throw new Error('setPeople')
    }
  }

  async setScore(docId: string, scoreList: ScoreResult[]): Promise<void> {
    try {
      await db.collection('results').doc(docId).update({
        scoreList
      })
    } catch (err) {
      errorLogger(err)
      throw new Error('setScore')
    }
  }

  async deleteResult(docId: string): Promise<void> {
    try {
      await db.collection('results').doc(docId).delete()
    } catch (err) {
      errorLogger(err)
      throw new Error('deleteResult')
    }
  }
}
