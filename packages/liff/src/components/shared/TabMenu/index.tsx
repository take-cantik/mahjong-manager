import { useRecoilValue, useSetRecoilState } from 'recoil'

import { menuState } from '~/state/menu'

import { TabButton } from '../TabButton'
import * as styles from './styles'

export const TabMenu = () => {
  const menu = useRecoilValue(menuState)
  const setMenuState = useSetRecoilState(menuState)

  return (
    <menu css={styles.common}>
      <TabButton active={menu.state === '4'} onClick={() => setMenuState({ state: '4' })}>
        四人麻雀
      </TabButton>
      <TabButton active={menu.state === '3'} onClick={() => setMenuState({ state: '3' })}>
        三人麻雀
      </TabButton>
      <TabButton active={menu.state === 'ranking'} onClick={() => setMenuState({ state: 'ranking' })}>
        ランキング
      </TabButton>
    </menu>
  )
}
