export interface User {
  lineId: string
  name: string
  threeRecord: {
    rate: number
    lastWeekRate: number
    rankHistory: number[]
    gameCount: number
    rankCount: number
    firstCount: number
    secondCount: number
    thirdCount: number
    minusCount: number
  }
  fourRecord: {
    rate: number
    lastWeekRate: number
    rankHistory: number[]
    gameCount: number
    rankCount: number
    firstCount: number
    secondCount: number
    thirdCount: number
    fourthCount: number
    minusCount: number
  }
}
