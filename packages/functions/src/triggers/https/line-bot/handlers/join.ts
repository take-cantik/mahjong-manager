import { JoinEvent } from '@line/bot-sdk'
import { StateRepository } from '~/Infrastructure/RepositoryImpl/Firebase/StateRepository'

export const joinHandler = async (event: JoinEvent) => {
  const stateRepository = new StateRepository()

  if (event.source.type === 'group') {
    await stateRepository.addState({ groupId: event.source.groupId, docId: '' })
  }
}
