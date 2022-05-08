import { PostbackEvent } from '@line/bot-sdk'
import { PostbackRepository } from '~/Infrastructure/RepositoryImpl/Firebase/PostbackRepository'
import { lineClient } from '~/utils/line'
import { getPrefix, getUuid } from '~/utils/postback'
import { errorLogger } from '~/utils/util'
import { confirmHandler } from './confirm'
import { gameHandler } from './game'

export const postbacksHandler = async (event: PostbackEvent): Promise<void> => {
  try {
    const postbackRepository = new PostbackRepository()
    const uuid = getUuid(event)
    const prefix = getPrefix(event)

    if (await postbackRepository.existPostback(uuid)) {
      await lineClient.replyMessage(event.replyToken, { type: 'text', text: 'このメッセージは既に使用されています' })
    } else if (prefix === 'game') {
      await gameHandler(event)
    } else if (prefix === 'confirm') {
      await confirmHandler(event)
    }
  } catch (err) {
    errorLogger(err)
    throw new Error('postbacks handler')
  }
}
