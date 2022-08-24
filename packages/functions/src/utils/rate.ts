import {
  FOUR_RANK_VALUE_LIST_0,
  FOUR_RANK_VALUE_LIST_3K,
  FOUR_RANK_VALUE_LIST_6K,
  FOUR_RANK_VALUE_LIST_9K,
  THREE_RANK_VALUE_LIST_0,
  THREE_RANK_VALUE_LIST_3K,
  THREE_RANK_VALUE_LIST_6K,
  THREE_RANK_VALUE_LIST_9K
} from '~/constant'
import { Result, ScoreResult } from '~/Domains/Entities/Result'
import { Participant } from '~/triggers/https/line-bot/handlers/postbacks/confirm'

export const getAverageScore = (scoreList: ScoreResult[]) => {
  let sum = 0
  scoreList.forEach((scoreResult) => {
    sum += scoreResult.score
  })

  return sum / scoreList.length
}

const getRankValue = (participant: Participant, result: Result): number => {
  if (result.people === 3) {
    return participant.threeRecord.rate < 3000
      ? THREE_RANK_VALUE_LIST_0[participant.order - 1]
      : participant.threeRecord.rate < 6000
      ? THREE_RANK_VALUE_LIST_3K[participant.order - 1]
      : participant.threeRecord.rate < 9000
      ? THREE_RANK_VALUE_LIST_6K[participant.order - 1]
      : THREE_RANK_VALUE_LIST_9K[participant.order - 1]
  } else {
    return participant.fourRecord.rate < 3000
      ? FOUR_RANK_VALUE_LIST_0[participant.order - 1]
      : participant.fourRecord.rate < 6000
      ? FOUR_RANK_VALUE_LIST_3K[participant.order - 1]
      : participant.fourRecord.rate < 9000
      ? FOUR_RANK_VALUE_LIST_6K[participant.order - 1]
      : FOUR_RANK_VALUE_LIST_9K[participant.order - 1]
  }
}

const getScoreDiff = (score: number, defaultScore: number): number => {
  return (score - defaultScore) / 400
}

const getOtherRateDiff = (totalRate: number, result: Result, participant: Participant): number => {
  if (result.people === 4) {
    return ((totalRate - participant.fourRecord.rate) / (result.people - 1) - participant.fourRecord.rate) / 100
  } else {
    return ((totalRate - participant.threeRecord.rate) / (result.people - 1) - participant.threeRecord.rate) / 100
  }
}

export const getRateDiff = (participant: Participant, result: Result, defaultScore: number, totalRate: number) => {
  const rankValue = getRankValue(participant, result)
  const scoreDiff = getScoreDiff(participant.score, defaultScore)
  const otherRateDiff = getOtherRateDiff(totalRate, result, participant)
  return rankValue + otherRateDiff < 0 && participant.order < 3 ? scoreDiff : rankValue + scoreDiff + otherRateDiff
}

export const showRate = (newRate: number, diff: number): string => {
  const diffStr = diff >= 0 ? `+${diff}` : `${diff}`
  return `${newRate} (${diffStr})`
}
