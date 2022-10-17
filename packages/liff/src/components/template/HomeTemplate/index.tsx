import { useRecoilValue } from 'recoil'

import { FourResult } from '~/components/domain/home/FourResult'
import { ThreeResult } from '~/components/domain/home/ThreeResult'
import { TabMenu } from '~/components/shared/TabMenu'
import { gameState } from '~/state/game'

import * as styles from './styles'

export const HomeTemplate = () => {
  const game = useRecoilValue(gameState)

  return (
    <>
      <main css={styles.main}>{game.people === 4 ? <FourResult /> : <ThreeResult />}</main>
      <TabMenu />
    </>
  )
}
