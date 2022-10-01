import { useRecoilValue, useSetRecoilState } from 'recoil'

import { gameState } from '~/state/game'

import { TabButton } from '../TabButton'
import * as styles from './styles'

export const TabMenu = () => {
  const game = useRecoilValue(gameState)
  const setGameState = useSetRecoilState(gameState)

  return (
    <menu css={styles.common}>
      <TabButton active={game.people === 4} onClick={() => setGameState({ people: 4 })}>
        四人麻雀
      </TabButton>
      <TabButton active={game.people === 3} onClick={() => setGameState({ people: 3 })}>
        三人麻雀
      </TabButton>
    </menu>
  )
}
