import { FollowEvent } from '@line/bot-sdk'
import { UserRepository } from '~/Infrastructure/RepositoryImpl/Firebase/UserRepository'
import { lineClient } from '~/utils/line'
import { msgFollow } from '~line/notice-messages/follow'

export const followHandler = async (event: FollowEvent): Promise<void> => {
  const userRepository = new UserRepository()
  const lineId = event.source.userId
  if (!lineId) throw new Error()

  if (!userRepository.getUser(lineId)) {
    const user = await lineClient.getProfile(lineId)
    await userRepository.addUser({
      lineId: event.source.userId!,
      name: user.displayName,
      rate: 1600
    })
  }
  await lineClient.replyMessage(event.replyToken, msgFollow)
}
