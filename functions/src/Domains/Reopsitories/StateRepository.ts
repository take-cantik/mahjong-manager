import { State } from '../Entities/State'

export interface StateRepositoryInterface {
  getCurrentState: () => Promise<State>
  addState: (state: State) => Promise<void>
  changeState: (newState: State) => Promise<void>
}
