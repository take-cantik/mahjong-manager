export const getAverage = (array: number[]) => {
  let sum = 0
  array.forEach((rate: number) => {
    sum += rate
  })

  return sum / array.length
}

const getRankValue = (rank: number, people: 3 | 4): number => {
  if (people === 3) {
    const rankValueList = [15, 0, -15]
    return rankValueList[rank - 1]
  } else {
    const rankValueList = [15, 5, -5, -15]
    return rankValueList[rank - 1]
  }
}

const getOtherRates = (myRate: number, everyoneRates: number[], people: 3 | 4): number[] => {
  const otherRates = everyoneRates.filter((rate) => rate !== myRate)
  while (otherRates.length !== people - 1) {
    otherRates.push(myRate)
  }
  return otherRates
}

const getRankPoint = (myScore: number, defaultScore: number, rank: number, people: 3 | 4): number => {
  return (myScore - defaultScore) / 1000 + getRankValue(rank, people)
}

export const rateDiff = (
  myRate: number,
  everyoneRates: number[],
  myScore: number,
  defaultScore: number,
  people: 3 | 4,
  rank: number,
  round: 1 | 2
) => {
  const otherRates = getOtherRates(myRate, everyoneRates, people)
  const rankPoint = getRankPoint(myScore, defaultScore, rank, people)
  const fluctuationValue: number = (getAverage(otherRates) - myRate) / 80
  return Math.floor(((rankPoint + fluctuationValue) / 10) * round)
}

export const showRate = (newRate: number, diff: number): string => {
  const diffStr = diff >= 0 ? `+${diff}` : `${diff}`
  return `${newRate} (${diffStr})`
}
