import { PostbackEvent } from '@line/bot-sdk'
import { User } from '~/Domains/Entities/User'
import { ResultRepository } from '~/Infrastructure/RepositoryImpl/Firebase/ResultRepository'
import { StateRepository } from '~/Infrastructure/RepositoryImpl/Firebase/StateRepository'
import { UserRepository } from '~/Infrastructure/RepositoryImpl/Firebase/UserRepository'
import { db } from '~/utils/firebase'
import { lineClient } from '~/utils/line'
import { getData, getDocId } from '~/utils/postback'
import { getAverageScore, getRateDiff } from '~/utils/rate'
import { msgRateResult } from '../../notice-messages/select-game'

export interface RateResult {
  userName: string
  newRate: number
  rateDiff: number
}

export interface Participant extends User {
  score: number
  order: number
}

export const confirmHandler = async (event: PostbackEvent): Promise<void> => {
  const resultRepository = new ResultRepository()
  const userRepository = new UserRepository()
  const stateRepository = new StateRepository()

  const data = getData(event)
  const docId = getDocId(event)
  if (!docId) throw new Error()

  if (data === '記録する' && event.source.type === 'group') {
    const result = await resultRepository.getResult(docId)

    const totalRate = {
      three: 0,
      four: 0
    }

    const participantList: Participant[] = await Promise.all(
      result.scoreList.map(async (scoreResult): Promise<Participant> => {
        const user = await userRepository.getUser(scoreResult.participantId)
        if (!user) throw new Error()
        if (result.people === 4) {
          totalRate.four++
        } else {
          totalRate.three++
        }
        return {
          lineId: user.lineId,
          name: user.name,
          threeRecord: user.threeRecord,
          fourRecord: user.fourRecord,
          score: scoreResult.score,
          order: scoreResult.order
        }
      })
    )

    const defaultScore = getAverageScore(result.scoreList)

    const rateResultList: RateResult[] = []

    if (result.people === 4) {
      // 四麻の計算
      participantList.forEach(async (participant) => {
        const rateDiff = getRateDiff(participant, result, defaultScore, totalRate.four)
        participant.fourRecord.rate += rateDiff
        participant.fourRecord.gameCount++
        participant.fourRecord.rankCount += participant.order
        participant.fourRecord.rankHistory.push(participant.order)
        participant.fourRecord.rankHistory = participant.fourRecord.rankHistory.slice(-10)
        if (participant.order === 1) {
          participant.fourRecord.firstCount++
        } else if (participant.order === 2) {
          participant.fourRecord.secoundCount++
        } else if (participant.order === 3) {
          participant.fourRecord.thirdCount++
        } else if (participant.order === 4) {
          participant.fourRecord.fourCount++
        }
        if (participant.score < 0) {
          participant.fourRecord.minusCount++
        }

        rateResultList.push({
          userName: participant.name,
          newRate: participant.fourRecord.rate,
          rateDiff
        })

        await db.collection('users').doc(participant.lineId).update({
          lineId: participant.lineId,
          name: participant.name,
          threeRecord: participant.threeRecord,
          fourRecord: participant.fourRecord
        })
      })
    } else {
      participantList.forEach(async (participant) => {
        const rateDiff = getRateDiff(participant, result, defaultScore, totalRate.three)
        participant.threeRecord.rate += rateDiff
        participant.threeRecord.gameCount++
        participant.threeRecord.rankCount += participant.order
        participant.threeRecord.rankHistory.push(participant.order)
        participant.threeRecord.rankHistory = participant.threeRecord.rankHistory.slice(-10)
        if (participant.order === 1) {
          participant.threeRecord.firstCount++
        } else if (participant.order === 2) {
          participant.threeRecord.secoundCount++
        } else if (participant.order === 3) {
          participant.threeRecord.thirdCount++
        }
        if (participant.score < 0) {
          participant.threeRecord.minusCount++
        }

        rateResultList.push({
          userName: participant.name,
          newRate: participant.threeRecord.rate,
          rateDiff
        })

        await db.collection('users').doc(participant.lineId).update({
          lineId: participant.lineId,
          name: participant.name,
          threeRecord: participant.threeRecord,
          fourRecord: participant.fourRecord
        })
      })
    }

    await stateRepository.changeState({ groupId: event.source.groupId, docId: '' })
    await lineClient.replyMessage(event.replyToken, msgRateResult(rateResultList))
  } else if (data === 'やり直す') {
    await resultRepository.setScore(docId, [])
    await lineClient.replyMessage(event.replyToken, { type: 'text', text: '得点を入力してください' })
  }
}
