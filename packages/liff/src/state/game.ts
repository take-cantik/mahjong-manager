import { atom } from 'recoil'

export interface GameState {
  people: 3 | 4
}

export const gameState = atom<GameState>({
  key: 'gameState',
  default: {
    people: 4
  },
  dangerouslyAllowMutability: true
})
