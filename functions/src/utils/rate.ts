const rateAverage = (rates: number[]) => {
  let sum = 0
  rates.forEach((rate: number) => {
    sum += rate
  })

  return sum / rates.length
}

const getRankValueList = (people: 3 | 4): number[] => {
  if (people === 3) {
    return [50, -10, -40]
  } else {
    return [50, 10, -20, -40]
  }
}

export const newRate = (myRate: number, otherRates: number[], people: 3 | 4, rank: number, round: 1 | 2) => {
  const rankValueList = getRankValueList(people)
  const fluctuationValue: number = (rateAverage(otherRates) - myRate) / 80
  const addValue = Math.floor(((rankValueList[rank - 1] + fluctuationValue) / 10) * round)
  return myRate + addValue
}
