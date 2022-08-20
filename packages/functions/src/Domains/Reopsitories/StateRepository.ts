import { State } from '../Entities/State'

export interface StateRepositoryInterface {
  getCurrentState: (groupId: string) => Promise<State>
  addState: (state: State) => Promise<void>
  changeState: (newState: State) => Promise<void>
}
