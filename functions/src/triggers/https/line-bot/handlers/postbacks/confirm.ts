import { PostbackEvent } from '@line/bot-sdk'
import { User } from '~/Domains/Entities/User'
import { ResultRepository } from '~/Infrastructure/RepositoryImpl/Firebase/ResultRepository'
import { StateRepository } from '~/Infrastructure/RepositoryImpl/Firebase/StateRepository'
import { UserRepository } from '~/Infrastructure/RepositoryImpl/Firebase/UserRepository'
import { lineClient } from '~/utils/line'
import { getData, getDocId } from '~/utils/postback'
import { rateDiff } from '~/utils/rate'
import { msgRateResult } from '../../notice-messages/flexMessage'

export interface RateResult {
  userName: string
  newRate: number
  rateDiff: number
}

export const confirmHandler = async (event: PostbackEvent): Promise<void> => {
  const resultRepository = new ResultRepository()
  const userRepository = new UserRepository()
  const stateRepository = new StateRepository()

  const data = getData(event)
  const docId = getDocId(event)
  if (!docId) throw new Error()

  if (data === '記録する' && event.source.type === 'group') {
    const result = await resultRepository.getRecentDoc()

    const participantList: User[] = []
    const everyoneRates: number[] = []
    result.participantIdList.forEach(async (participantId: string) => {
      const user = await userRepository.getUser(participantId)
      if (!user) throw new Error()
      participantList.push(user)
      everyoneRates.push(user.rate)
    })

    const rateResultList: RateResult[] = []
    participantList.forEach(async (participant: User, index: number) => {
      const diff = rateDiff(participant.rate, everyoneRates, result.people, index - 1, result.round)
      const newRate = participant.rate + diff
      await userRepository.updateRate(participant.lineId, newRate)
      rateResultList.push({
        userName: participant.name,
        newRate: newRate,
        rateDiff: diff
      })
    })

    await stateRepository.changeState({ currentState: 0, groupId: event.source.groupId })
    await lineClient.replyMessage(event.replyToken, msgRateResult(rateResultList))
  } else if (data === 'やり直す') {
    await resultRepository.setScore(docId, [], [])
    await lineClient.replyMessage(event.replyToken, { type: 'text', text: '1位の人から順に得点を入力してください' })
  }
}