import { MessageEvent } from '@line/bot-sdk'
import { v4 as uuidv4 } from 'uuid'
import { ResultRepository } from '~/Infrastructure/RepositoryImpl/Firebase/ResultRepository'
import { getCurrentTime } from '~/utils/day'
import { lineClient } from '~/utils/line'
import { msgSelectGame } from '~line/notice-messages/select-game'

interface Props {
  event: MessageEvent
}

export const scoreStartHandler = async (props: Props) => {
  const { event } = props

  const resultRepository = new ResultRepository()
  const docId = await resultRepository.setTime(getCurrentTime())
  const uuid = uuidv4()
  await lineClient.replyMessage(event.replyToken, msgSelectGame(docId, uuid))
}
