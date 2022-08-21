import { MessageEvent, TextEventMessage } from '@line/bot-sdk'
import { StateRepository } from '~/Infrastructure/RepositoryImpl/Firebase/StateRepository'
import { errorLogger } from '~/utils/util'

import { scoreStartHandler } from './score-start'
import { cancelHandler } from './cancel'
import { scoreRecordHandler } from './score-record'

export const messageTextHandler = async (event: MessageEvent): Promise<void> => {
  try {
    const { text } = event.message as TextEventMessage
    const stateRepository = new StateRepository()

    if (event.source.type !== 'group') {
      return
    }

    const state = await stateRepository.getCurrentState(event.source.groupId)

    if (!state.docId && text === '記録開始') {
      await scoreStartHandler({ event })
    } else if (state.docId && text === 'キャンセル') {
      await cancelHandler({ groupId: event.source.groupId, docId: state.docId, replyToken: event.replyToken })
    } else if (state.docId) {
      await scoreRecordHandler({ event, userId: event.source.userId!, text, docId: state.docId })
    }
  } catch (err) {
    errorLogger(err)
    throw new Error('message text handler')
  }
}
