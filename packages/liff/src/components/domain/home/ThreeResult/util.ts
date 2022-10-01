import type { InformationProps } from '~/components/shared/Information'
import type { ThreeRecord } from '~/shared/Domain/user'

const mathRound = (num: number) => {
  return Math.floor(num * 100) / 100
}

export const createThreeRecord = (threeRecord: ThreeRecord): InformationProps[] => {
  return [
    {
      label: '対戦数',
      content: `${threeRecord.gameCount}`
    },
    {
      label: '平均順位',
      content: `${mathRound(threeRecord.rankCount / threeRecord.gameCount)}`
    },
    {
      label: '1位率',
      content: `${mathRound((threeRecord.firstCount / threeRecord.gameCount) * 100)}%`
    },
    {
      label: '2位率',
      content: `${mathRound((threeRecord.secondCount / threeRecord.gameCount) * 100)}%`
    },
    {
      label: '3位率',
      content: `${mathRound((threeRecord.thirdCount / threeRecord.gameCount) * 100)}%`
    },
    {
      label: '飛び率',
      content: `${mathRound((threeRecord.minusCount / threeRecord.gameCount) * 100)}%`
    }
  ]
}
