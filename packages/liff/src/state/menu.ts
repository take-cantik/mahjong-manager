import { atom } from 'recoil'

export interface MenuState {
  state: '3' | '4' | 'ranking'
}

export const menuState = atom<MenuState>({
  key: 'menuState',
  default: {
    state: '4'
  },
  dangerouslyAllowMutability: true
})
