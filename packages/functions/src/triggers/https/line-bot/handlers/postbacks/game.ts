import { PostbackEvent } from '@line/bot-sdk'
import { ResultRepository } from '~/Infrastructure/RepositoryImpl/Firebase/ResultRepository'
import { StateRepository } from '~/Infrastructure/RepositoryImpl/Firebase/StateRepository'
import { lineClient } from '~/utils/line'
import { getData, getDocId } from '~/utils/postback'

export const gameHandler = async (event: PostbackEvent): Promise<void> => {
  if (event.source.type === 'group') {
    const resultRepostitory = new ResultRepository()
    const stateRepository = new StateRepository()
    const data = getData(event).split('-')
    const docId = getDocId(event)

    if (!docId) throw new Error()
    const people = Number(data[0])
    if (!(people === 3 || people === 4)) throw new Error()
    const round = Number(data[1])
    if (!(round === 1 || round === 2)) throw new Error()

    await resultRepostitory.setGame(docId, people, round)
    await stateRepository.changeState({ groupId: event.source.groupId, docId })
    await lineClient.replyMessage(event.replyToken, { type: 'text', text: '得点を入力してください' })
  }
}
