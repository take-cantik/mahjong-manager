import { useRecoilValue } from 'recoil'

import { FourResult } from '~/components/domain/home/FourResult'
import { ThreeResult } from '~/components/domain/home/ThreeResult'
import { RankingItem } from '~/components/shared/RankingItem'
import { TabMenu } from '~/components/shared/TabMenu'
import { menuState } from '~/state/menu'

import * as styles from './styles'

export const HomeTemplate = () => {
  const menu = useRecoilValue(menuState)

  return (
    <>
      <main css={styles.main}>
        {menu.state === '4' ? (
          <FourResult />
        ) : menu.state === '3' ? (
          <ThreeResult />
        ) : (
          <>
            <p>Ranking</p>
            <RankingItem rank={1} name="おたけ@がんあabjfだ" rate={4000} />
            <RankingItem rank={2} name="おたけ@がんあabjfだ" rate={4000} />
            <RankingItem rank={3} name="おたけ@がんあabjfだ" rate={4000} />
            <RankingItem rank={4} name="おたけ@がん嗚呼日ahiahiあいはいはいはひあひあabjfだ" rate={4000} />
          </>
        )}
      </main>
      <TabMenu />
    </>
  )
}
