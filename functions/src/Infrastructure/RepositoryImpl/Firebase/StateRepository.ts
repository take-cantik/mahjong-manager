import { State } from '~/Domains/Entities/State'
import { StateRepositoryInterface } from '~/Domains/Reopsitories/StateRepository'
import { db } from '~/utils/firebase'
import { errorLogger } from '~/utils/util'

export class StateRepository implements StateRepositoryInterface {
  async getCurrentState(): Promise<State> {
    try {
      const res = await db.collection('state').doc('bot-state').get()

      if (!res.data()) throw new Error('state not found')

      return {
        currentState: res.data()!.currentState
      }
    } catch (err) {
      errorLogger(err)
      throw new Error('getState')
    }
  }

  async addState(state: State): Promise<void> {
    try {
      await db.collection('state').doc('bot-state').set(state)
    } catch (err) {
      errorLogger(err)
      throw new Error('getState')
    }
  }

  async changeState(newState: State): Promise<void> {
    try {
      await db.collection('state').doc('bot-state').update(newState)
    } catch (err) {
      errorLogger(err)
      throw new Error('changeState')
    }
  }
}
