import { MessageEvent } from '@line/bot-sdk'
import { v4 as uuidv4 } from 'uuid'
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

  const doc = await resultRepository.getResult(docId)
  const participantIdList = doc.participantIdList
  const scoreList = doc.scoreList

  if (participantIdList.includes(userId)) {
    await lineClient.replyMessage(event.replyToken, { type: 'text', text: '同じ人が入力しないでください' })
    return
  }

  const lastScore = scoreList.slice(-1)[0]
  if (lastScore !== undefined && lastScore < score) {
    await lineClient.replyMessage(event.replyToken, { type: 'text', text: '有効な点数を入力してください' })
    return
  }

  participantIdList.push(userId)
  scoreList.push(Number(text))
  await resultRepository.setScore(doc.id, participantIdList, scoreList)

  if (participantIdList.length === doc.people) {
    const participantList = await Promise.all(
      participantIdList.map(async (participantId: string) => {
        const participant = await userRepository.getUser(participantId)
        if (participant) {
          return participant.name
        } else if (event.source.type === 'group') {
          const user = await lineClient.getGroupMemberProfile(event.source.groupId, participantId)
          await userRepository.addUser({
            lineId: participantId,
            name: user.displayName,
            rate: 1600
          })
          return user.displayName
        } else {
          throw new Error()
        }
      })
    )

    const uuid = uuidv4()
    await lineClient.replyMessage(event.replyToken, msgConfirmResult(participantList, scoreList, uuid, doc.id))
  } else {
    await lineClient.replyMessage(event.replyToken, {
      type: 'text',
      text: `${scoreList.length + 1}位の方は入力してください`
    })
  }
}
