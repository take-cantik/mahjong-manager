import type { RankingItemProps } from '../RankingItem'
import { RankingItem } from '../RankingItem'
import * as styles from './styles'

interface RankingSectionProps {
  title: string
  userList: RankingItemProps[]
}

export const RankingSection = ({ title, userList }: RankingSectionProps) => {
  return (
    <div css={styles.common}>
      <h2 css={styles.title}>{title}</h2>
      <div>
        {userList.map((user) => (
          <RankingItem rank={user.rank} name={user.name} rate={user.rate} key={user.rank} />
        ))}
      </div>
    </div>
  )
}
