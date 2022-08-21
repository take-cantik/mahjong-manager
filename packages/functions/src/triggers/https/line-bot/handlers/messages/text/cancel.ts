import { ResultRepository } from '~/Infrastructure/RepositoryImpl/Firebase/ResultRepository'
import { StateRepository } from '~/Infrastructure/RepositoryImpl/Firebase/StateRepository'
import { lineClient } from '~/utils/line'

interface Props {
  groupId: string
  replyToken: string
  docId: string
}

export const cancelHandler = async (props: Props) => {
  const { groupId, replyToken, docId } = props

  const stateRepository = new StateRepository()
  const resultRepository = new ResultRepository()

  await resultRepository.deleteResult(docId)
  await stateRepository.changeState({ groupId, docId: '' })
  await lineClient.replyMessage(replyToken, { type: 'text', text: 'キャンセルしました' })
}
