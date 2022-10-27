import { RankingSection } from '~/components/shared/RankingSection'
import type { User } from '~/shared/types/user'

import * as styles from './styles'
import { createRankingUserList } from './util'

interface RankingProps {
  userList: User[]
}

export const Ranking = ({ userList }: RankingProps) => {
  const rankingList = createRankingUserList(userList)

  return (
    <div css={styles.common}>
      <RankingSection title="四人麻雀" rankingList={rankingList.fourRankingList} />
      <RankingSection title="三人麻雀" rankingList={rankingList.threeRankingList} />
    </div>
  )
}
