import { PostbackEvent } from '@line/bot-sdk'
import { ResultRepository } from '~/Infrastructure/RepositoryImpl/Firebase/ResultRepository'
import { lineClient } from '~/utils/line'
import { getData, getDocId } from '~/utils/postback'

export const confirmHandler = async (event: PostbackEvent): Promise<void> => {
  const resultRepository = new ResultRepository()

  const data = getData(event)
  const docId = getDocId(event)
  if (!docId) throw new Error()

  if (data === '記録する') {
    //
  } else if (data === 'やり直す') {
    await resultRepository.setScore(docId, [], [])
    await lineClient.replyMessage(event.replyToken, { type: 'text', text: '1位の人から順に得点を入力してください' })
  }
}
