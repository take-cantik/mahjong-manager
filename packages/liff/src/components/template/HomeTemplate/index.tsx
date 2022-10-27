import { useRecoilValue } from 'recoil'

import { FourResult } from '~/components/domain/home/FourResult'
import { ThreeResult } from '~/components/domain/home/ThreeResult'
import { RankingSection } from '~/components/shared/RankingSection'
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
            <RankingSection
              title="四人麻雀"
              userList={[
                { rank: 1, name: 'おたけ@がんあabjfだ', rate: 14000 },
                { rank: 2, name: 'おたけ@がんあabjfだ', rate: 4000 },
                { rank: 3, name: 'おたけ@がんあabjfだ', rate: 4000 },
                { rank: 4, name: 'おたけ@がんあabjf愛ウエイアウエ愛ういうだ', rate: 4000 },
                { rank: 5, name: 'おたけ@がんあabjfだ', rate: 4000 },
                { rank: 6, name: 'おたけ@がんあabjfだ', rate: 4000 },
                { rank: 7, name: 'おたけ@がんあabjfだがんあabjf愛ウエイアウエ愛ういうだ', rate: 4000 }
              ]}
            />
            <p>Ranking</p>
          </>
        )}
      </main>
      <TabMenu />
    </>
  )
}
