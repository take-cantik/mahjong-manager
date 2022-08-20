import { MessageEvent } from '@line/bot-sdk'
import { errorLogger } from '~/utils/util'
import { messageTextHandler } from './text'

export const messagesHandler = async (event: MessageEvent): Promise<void> => {
  try {
    switch (event.message.type) {
      case 'text':
        return await messageTextHandler(event)
      default:
    }
  } catch (err) {
    errorLogger(err)
    throw new Error('messages handler')
  }
}
