import { MessageEvent } from '@line/bot-sdk'
import { v4 as uuidv4 } from 'uuid'
import { ScoreResult } from '~/Domains/Entities/Result'
import { ResultRepository } from '~/Infrastructure/RepositoryImpl/Firebase/ResultRepository'
import { UserRepository } from '~/Infrastructure/RepositoryImpl/Firebase/UserRepository'
import { lineClient } from '~/utils/line'
import { msgConfirmResult } from '~line/notice-messages/select-game'

interface Props {
  event: MessageEvent
  docId: string
  text: string
  userId: string
}

export const scoreRecordHandler = async (props: Props) => {
  const { event, docId, text, userId } = props

  const resultRepository = new ResultRepository()
  const userRepository = new UserRepository()

  const score = Number(text)

  if (isNaN(score)) {
    await lineClient.replyMessage(event.replyToken, { type: 'text', text: '点数を入力してください' })
    return
  }

  const result = await resultRepository.getResult(docId)
  const scoreList = result.scoreList

  if (scoreList.findIndex((socreResult) => socreResult.participantId === userId) !== -1) {
    await lineClient.replyMessage(event.replyToken, { type: 'text', text: '同じ人が入力しないでください' })
    return
  }

  scoreList.push({
    participantId: userId,
    score: Number(text),
    order: -1
  })

  if (scoreList.length === result.people) {
    scoreList.sort((a, b) => a.score - b.score)
    scoreList.forEach((scoreResult, index) => {
      scoreResult.order = index + 1
    })

    let totalScore = 0

    const participantList = await Promise.all(
      scoreList.map(async (scoreResult: ScoreResult) => {
        totalScore += scoreResult.score
        const participant = await userRepository.getUser(scoreResult.participantId)
        if (participant) {
          return participant.name
        } else if (event.source.type === 'group') {
          const user = await lineClient.getGroupMemberProfile(event.source.groupId, scoreResult.participantId)
          await userRepository.addUser({
            lineId: scoreResult.participantId,
            name: user.displayName,
            threeRecord: {
              rate: 1600,
              rankHistory: [],
              gameCount: 0,
              rankCount: 0,
              firstCount: 0,
              secondCount: 0,
              thirdCount: 0,
              minusCount: 0
            },
            fourRecord: {
              rate: 1600,
              rankHistory: [],
              gameCount: 0,
              rankCount: 0,
              firstCount: 0,
              secondCount: 0,
              thirdCount: 0,
              fourthCount: 0,
              minusCount: 0
            }
          })
          return user.displayName
        } else {
          throw new Error()
        }
      })
    )

    await resultRepository.setScore(String(result.time), scoreList)

    const uuid = uuidv4()
    await lineClient.replyMessage(
      event.replyToken,
      msgConfirmResult(participantList, scoreList, totalScore, uuid, String(result.time))
    )
  } else {
    await resultRepository.setScore(String(result.time), scoreList)
    await lineClient.replyMessage(event.replyToken, {
      type: 'text',
      text: `点数を入力してください`
    })
  }
}
