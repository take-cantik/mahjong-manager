import { useRecoilValue } from 'recoil'

import { FourResult } from '~/components/domain/home/FourResult'
import { ThreeResult } from '~/components/domain/home/ThreeResult'
import { TabMenu } from '~/components/shared/TabMenu'
import { menuState } from '~/state/menu'

import * as styles from './styles'

export const HomeTemplate = () => {
  const menu = useRecoilValue(menuState)

  return (
    <>
      <main css={styles.main}>
        {menu.state === '4' ? <FourResult /> : menu.state === '3' ? <ThreeResult /> : <p>Ranking</p>}
      </main>
      <TabMenu />
    </>
  )
}
