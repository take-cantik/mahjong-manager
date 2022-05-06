import { MessageEvent, TextEventMessage } from '@line/bot-sdk'
import { lineClient, makeReplyMessage } from '~/utils/line'
import { errorLogger } from '~/utils/util'

// *********
// main関数
// *********

export const messageTextHandler = async (event: MessageEvent): Promise<void> => {
  try {
    const { text } = event.message as TextEventMessage

    // state === 0
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
