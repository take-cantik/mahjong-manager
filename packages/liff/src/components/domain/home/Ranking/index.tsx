import type { RankingItemProps } from '~/components/shared/RankingItem'
import { RankingSection } from '~/components/shared/RankingSection'

import * as styles from './styles'

interface RankingProps {
  fourUserList: RankingItemProps[]
  threeUserList: RankingItemProps[]
}

export const Ranking = ({ fourUserList, threeUserList }: RankingProps) => {
  return (
    <div css={styles.common}>
      <RankingSection title="四人麻雀" userList={fourUserList} />
      <RankingSection title="三人麻雀" userList={threeUserList} />
    </div>
  )
}
