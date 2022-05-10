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

const getOtherRates = (myRate: number, everyoneRates: number[]): number[] => {
  const index = everyoneRates.indexOf(myRate)
  return everyoneRates.splice(index, 1)
}

export const rateDiff = (myRate: number, everyoneRates: number[], people: 3 | 4, rank: number, round: 1 | 2) => {
  const otherRates = getOtherRates(myRate, everyoneRates)
  const rankValueList = getRankValueList(people)
  const fluctuationValue: number = (rateAverage(otherRates) - myRate) / 80
  return Math.floor(((rankValueList[rank - 1] + fluctuationValue) / 10) * round)
}
