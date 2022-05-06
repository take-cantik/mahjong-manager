import { PostbackEvent } from '@line/bot-sdk'
import { getPrefix, getUuid } from '~/utils/postback'
import { errorLogger } from '~/utils/util'

export const postbacksHandler = async (event: PostbackEvent): Promise<void> => {
  try {
    const uuid = getUuid(event)
    const prefix = getPrefix(event)

    if (prefix === 'game') {
    }
  } catch (err) {
    errorLogger(err)
    throw new Error('postbacks handler')
  }
}
