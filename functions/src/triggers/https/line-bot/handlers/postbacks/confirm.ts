import { PostbackEvent } from '@line/bot-sdk'
import { User } from '~/Domains/Entities/User'
import { ResultRepository } from '~/Infrastructure/RepositoryImpl/Firebase/ResultRepository'
import { UserRepository } from '~/Infrastructure/RepositoryImpl/Firebase/UserRepository'
import { lineClient } from '~/utils/line'
import { getData, getDocId } from '~/utils/postback'
import { rateDiff } from '~/utils/rate'

interface Participant {
  user: User
  score: number
}

// TODO: 名前用検討
interface NewResult {
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

    const participantList: Participant[] = []
    result.participantIdList.forEach(async (participantId: string, index: number) => {
      const user = await userRepository.getUser(participantId)
      if (!user) throw new Error()
      participantList.push({
        user,
        score: result.scoreList[index]
      })
    })

    // TODO ↑このfor消せるから下と統合

    const newResult: NewResult[] = []
    participantList.forEach(async (participant: Participant, index: number) => {
      const otherRates = result.scoreList.splice(index, 1)
      const diff = rateDiff(participant.score, otherRates, result.people, index - 1, result.round)
      await userRepository.updateRate(participant.user.lineId, participant.user.rate + diff)
      newResult.push({
        userName: participant.user.name,
        newRate: participant.user.rate + diff,
        rateDiff: diff
      })
    })
  } else if (data === 'やり直す') {
    await resultRepository.setScore(docId, [], [])
    await lineClient.replyMessage(event.replyToken, { type: 'text', text: '1位の人から順に得点を入力してください' })
  }
}
