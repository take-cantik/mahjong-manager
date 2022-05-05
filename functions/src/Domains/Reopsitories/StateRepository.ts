import { State } from '../Entities/State'

export interface StateRepositoryInterface {
  getCurrentState: () => Promise<State>
  changeState: (newState: State) => Promise<void>
}
