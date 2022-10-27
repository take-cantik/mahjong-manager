import { useRecoilValue } from 'recoil'

import { FourResult } from '~/components/domain/home/FourResult'
import { Ranking } from '~/components/domain/home/Ranking'
import { ThreeResult } from '~/components/domain/home/ThreeResult'
import { TabMenu } from '~/components/shared/TabMenu'
import { useUserList } from '~/hooks/useUserList'
import { menuState } from '~/state/menu'

import * as styles from './styles'

export const HomeTemplate = () => {
  const menu = useRecoilValue(menuState)
  const { userList } = useUserList()

  return (
    <>
      <main css={styles.main}>
        {menu.state === '4' ? <FourResult /> : menu.state === '3' ? <ThreeResult /> : <Ranking userList={userList} />}
      </main>
      <TabMenu />
    </>
  )
}
