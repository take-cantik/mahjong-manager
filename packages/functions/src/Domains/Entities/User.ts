export interface User {
  lineId: string
  name: string
  threeRecord: {
    rate: number
    rankHistory: number[]
    gameCount: number
    rankCount: number
    firstCount: number
    secoundCount: number
    thirdCount: number
    minusCount: number
  }
  fourRecord: {
    rate: number
    rankHistory: number[]
    gameCount: number
    rankCount: number
    firstCount: number
    secoundCount: number
    thirdCount: number
    fourCount: number
    minusCount: number
  }
}
