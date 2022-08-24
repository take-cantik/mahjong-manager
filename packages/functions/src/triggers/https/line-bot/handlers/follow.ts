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
      lineId: lineId,
      name: user.displayName,
      threeRecord: {
        rate: 1600,
        rankHistory: [],
        gameCount: 0,
        rankCount: 0,
        firstCount: 0,
        secoundCount: 0,
        thirdCount: 0,
        minusCount: 0
      },
      fourRecord: {
        rate: 1600,
        rankHistory: [],
        gameCount: 0,
        rankCount: 0,
        firstCount: 0,
        secoundCount: 0,
        thirdCount: 0,
        fourCount: 0,
        minusCount: 0
      }
    })
  }
  await lineClient.replyMessage(event.replyToken, msgFollow)
}
