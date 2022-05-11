import { WebhookEvent } from '@line/bot-sdk'
import { lineClient } from '~/utils/line'
import { msgError } from '~line/notice-messages/other'

import { followHandler } from './follow'
import { messagesHandler } from './messages'
import { errorLogger } from '~/utils/util'
import { joinHandler } from './join'
import { postbacksHandler } from './postbacks'

export const handlers = async (event: WebhookEvent): Promise<void> => {
  try {
    switch (event.type) {
      case 'follow':
        return await followHandler(event)
      case 'message':
        return await messagesHandler(event)
      case 'join':
        return await joinHandler(event)
      case 'postback':
        return await postbacksHandler(event)
      default:
    }
  } catch (err) {
    lineClient.pushMessage(event.source.userId!, msgError).catch
    errorLogger(err)
    throw new Error('handlers')
  }
}
