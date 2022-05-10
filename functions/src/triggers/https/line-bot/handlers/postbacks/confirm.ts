import { PostbackEvent } from '@line/bot-sdk'
import { User } from '~/Domains/Entities/User'
import { ResultRepository } from '~/Infrastructure/RepositoryImpl/Firebase/ResultRepository'
import { UserRepository } from '~/Infrastructure/RepositoryImpl/Firebase/UserRepository'
import { lineClient } from '~/utils/line'
import { getData, getDocId } from '~/utils/postback'
import { rateDiff } from '~/utils/rate'

interface ResultMsgElement {
  userName: string
  newRate: number
  rateDiff: number
}

export const confirmHandler = async (event: PostbackEvent): Promise<void> => {
  const resultRepository = new ResultRepository()
  const userRepository = new UserRepository()

  const data = getData(event)
  const docId = getDocId(event)
  if (!docId) throw new Error()

  if (data === '記録する') {
    const result = await resultRepository.getRecentDoc()

    const participantList: User[] = []
    const everyoneRates: number[] = []
    result.participantIdList.forEach(async (participantId: string) => {
      const user = await userRepository.getUser(participantId)
      if (!user) throw new Error()
      participantList.push(user)
      everyoneRates.push(user.rate)
    })

    const resultMsgList: ResultMsgElement[] = []
    participantList.forEach(async (participant: User, index: number) => {
      const diff = rateDiff(participant.rate, everyoneRates, result.people, index - 1, result.round)
      const newRate = participant.rate + diff
      await userRepository.updateRate(participant.lineId, newRate)
      resultMsgList.push({
        userName: participant.name,
        newRate: newRate,
        rateDiff: diff
      })
    })
  } else if (data === 'やり直す') {
    await resultRepository.setScore(docId, [], [])
    await lineClient.replyMessage(event.replyToken, { type: 'text', text: '1位の人から順に得点を入力してください' })
  }
}
