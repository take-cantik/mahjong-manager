import { MessageEvent, TextEventMessage } from '@line/bot-sdk'
import { ResultRepository } from '~/Infrastructure/RepositoryImpl/Firebase/ResultRepository'
import { StateRepository } from '~/Infrastructure/RepositoryImpl/Firebase/StateRepository'
import { getCurrentTime } from '~/utils/day'
import { lineClient, makeReplyMessage } from '~/utils/line'
import { errorLogger } from '~/utils/util'
import { selectGame } from '../../notice-messages/flexMessage'
import { v4 as uuidv4 } from 'uuid'

// *********
// main関数
// *********

export const messageTextHandler = async (event: MessageEvent): Promise<void> => {
  try {
    const { text } = event.message as TextEventMessage
    const stateRepository = new StateRepository()
    const resultRepository = new ResultRepository()

    const state = await stateRepository.getCurrentState()

    if (state.currentState === 0 && text === '記録開始') {
      const docId = await resultRepository.setTime(getCurrentTime())
      const uuid = uuidv4()
      await lineClient.replyMessage(event.replyToken, selectGame(docId, uuid))
    }
    /*
      「記録」かなんかで state === 1
      3 or 4麻 -> 半荘 or 東風 を選択するflexMessage
    */

    // state === 1
    /*
      n位から情報を入力
    */

    await lineClient.replyMessage(event.replyToken, makeReplyMessage(text))
  } catch (err) {
    errorLogger(err)
    throw new Error('message text handler')
  }
}
