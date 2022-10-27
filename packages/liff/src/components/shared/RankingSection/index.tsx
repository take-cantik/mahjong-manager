import type { RankingItemProps } from '../RankingItem'
import { RankingItem } from '../RankingItem'
import * as styles from './styles'

interface RankingSectionProps {
  title: string
  rankingList: RankingItemProps[]
}

export const RankingSection = ({ rankingList, title }: RankingSectionProps) => {
  return (
    <div css={styles.common}>
      <h2 css={styles.title}>{title}</h2>
      <div>
        {rankingList.map((user) => (
          <RankingItem rank={user.rank} name={user.name} rate={user.rate} key={user.rank} />
        ))}
      </div>
    </div>
  )
}
