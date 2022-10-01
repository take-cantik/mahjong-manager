import type { InformationProps } from '~/components/shared/Information'
import type { FourRecord } from '~/shared/Domain/user'

const mathRound = (num: number) => {
  return Math.floor(num * 100) / 100
}

export const createFourRecord = (fourRecord: FourRecord): InformationProps[] => {
  return [
    {
      label: '対戦数',
      content: `${fourRecord.gameCount}`
    },
    {
      label: '平均順位',
      content: `${mathRound(fourRecord.rankCount / fourRecord.gameCount)}`
    },
    {
      label: '1位率',
      content: `${mathRound((fourRecord.firstCount / fourRecord.gameCount) * 100)}%`
    },
    {
      label: '2位率',
      content: `${mathRound((fourRecord.secondCount / fourRecord.gameCount) * 100)}%`
    },
    {
      label: '3位率',
      content: `${mathRound((fourRecord.thirdCount / fourRecord.gameCount) * 100)}%`
    },
    {
      label: '4位率',
      content: `${mathRound((fourRecord.fourthCount / fourRecord.gameCount) * 100)}%`
    },
    {
      label: '飛び率',
      content: `${mathRound((fourRecord.minusCount / fourRecord.gameCount) * 100)}%`
    }
  ]
}
