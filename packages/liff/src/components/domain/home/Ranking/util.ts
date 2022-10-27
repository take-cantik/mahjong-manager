import type { RankingItemProps } from '~/components/shared/RankingItem'
import type { User } from '~/shared/types/user'

interface RankingUserList {
  threeRankingList: RankingItemProps[]
  fourRankingList: RankingItemProps[]
}

export const createRankingUserList = (userList: User[]): RankingUserList => {
  const threeRankingList: RankingItemProps[] = []
  const threeUserList = userList.sort((a, b) => (a.threeRecord.rate < b.threeRecord.rate ? 1 : -1))

  threeUserList.forEach((user, index) => {
    threeRankingList.push({
      rank: index + 1,
      name: user.name,
      rate: user.threeRecord.rate
    })
  })

  const fourRankingList: RankingItemProps[] = []
  const fourUserList = userList.sort((a, b) => (a.fourRecord.rate < b.fourRecord.rate ? 1 : -1))

  fourUserList.forEach((user, index) => {
    fourRankingList.push({
      rank: index + 1,
      name: user.name,
      rate: user.fourRecord.rate
    })
  })

  return { threeRankingList, fourRankingList }
}
