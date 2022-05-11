const rateAverage = (rates: number[]) => {
  let sum = 0
  rates.forEach((rate: number) => {
    sum += rate
  })

  return sum / rates.length
}

export const getDefaultScore = (everyoneScores: number[], people: 3 | 4) => {
  let sum = 0
  everyoneScores.forEach((score: number) => {
    sum += score
  })

  return sum / people
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
  const otherRates = everyoneRates.filter((rate) => rate !== myRate)
  const rankPoint = getRankPoint(myScore, defaultScore, rank, people)
  const fluctuationValue: number = (rateAverage(otherRates) - myRate) / 80
  return Math.floor(((rankPoint + fluctuationValue) / 10) * round)
}

export const showRate = (newRate: number, diff: number): string => {
  const diffStr = diff >= 0 ? `+${diff}` : `${diff}`
  return `${newRate} (${diffStr})`
}
