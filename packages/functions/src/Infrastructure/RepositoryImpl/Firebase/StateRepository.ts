import { State } from '~/Domains/Entities/State'
import { StateRepositoryInterface } from '~/Domains/Reopsitories/StateRepository'
import { db } from '~/utils/firebase'
import { errorLogger } from '~/utils/util'

export class StateRepository implements StateRepositoryInterface {
  async getCurrentState(groupId: string): Promise<State> {
    try {
      const res = await db.collection('state').doc(groupId).get()
      const data = res.data()
      if (!data) throw new Error('state not found')

      return {
        groupId: data.groupId,
        docId: data.docId
      }
    } catch (err) {
      errorLogger(err)
      throw new Error('getState')
    }
  }

  async addState(state: State): Promise<void> {
    try {
      await db.collection('state').doc(state.groupId).set(state)
    } catch (err) {
      errorLogger(err)
      throw new Error('getState')
    }
  }

  async changeState(newState: State): Promise<void> {
    try {
      await db
        .collection('state')
        .doc(newState.groupId)
        .update({ ...newState })
    } catch (err) {
      errorLogger(err)
      throw new Error('changeState')
    }
  }
}
