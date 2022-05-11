import { MessageEvent, TextEventMessage } from '@line/bot-sdk'
import { ResultRepository } from '~/Infrastructure/RepositoryImpl/Firebase/ResultRepository'
import { StateRepository } from '~/Infrastructure/RepositoryImpl/Firebase/StateRepository'
import { getCurrentTime } from '~/utils/day'
import { lineClient } from '~/utils/line'
import { errorLogger } from '~/utils/util'
import { msgConfirmResult, msgSelectGame } from '../../notice-messages/flexMessage'
import { v4 as uuidv4 } from 'uuid'
import { UserRepository } from '~/Infrastructure/RepositoryImpl/Firebase/UserRepository'

// *********
// main関数
// *********

export const messageTextHandler = async (event: MessageEvent): Promise<void> => {
  try {
    const { text } = event.message as TextEventMessage
    const stateRepository = new StateRepository()
    const resultRepository = new ResultRepository()
    const userRepository = new UserRepository()

    if (event.source.type === 'group') {
      const state = await stateRepository.getCurrentState(event.source.groupId)

      if (state.currentState === 0 && text === '記録開始') {
        const docId = await resultRepository.setTime(getCurrentTime())
        const uuid = uuidv4()
        await lineClient.replyMessage(event.replyToken, msgSelectGame(docId, uuid))
      } else if (state.currentState === 1 && text === 'キャンセル') {
        await resultRepository.deleteRecentDoc()
        await lineClient.replyMessage(event.replyToken, { type: 'text', text: 'キャンセルしました' })
      } else if (state.currentState === 1) {
        const doc = await resultRepository.getRecentDoc()
        if (doc.id.length === doc.people) {
          const participantList: string[] = []
          doc.participantIdList.forEach(async (participantId: string) => {
            const participant = await userRepository.getUser(participantId)

            if (participant) {
              participantList.push(participant.name)
            } else if (event.source.type === 'group') {
              const user = await lineClient.getRoomMemberProfile(event.source.groupId, participantId)
              await userRepository.addUser({
                lineId: participantId,
                name: user.displayName,
                rate: 1600
              })
              participantList.push(user.displayName)
            }
          })
          const uuid = uuidv4()
          await lineClient.replyMessage(
            event.replyToken,
            msgConfirmResult(participantList, doc.scoreList, uuid, doc.id)
          )
        } else {
          const participantIdList = doc.participantIdList
          const scoreList = doc.scoreList
          participantIdList.push(event.source.userId!)
          scoreList.push(Number(text))
          await resultRepository.setScore(doc.id, participantIdList, scoreList)
          await lineClient.replyMessage(event.replyToken, {
            type: 'text',
            text: `${scoreList.length + 2}位の方は入力してください`
          })
        }
      }
    }
  } catch (err) {
    errorLogger(err)
    throw new Error('message text handler')
  }
}
