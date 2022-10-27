import { UserRepository } from '~/Infrastructure/RepositoryImpl/Firebase/UserRepository'
import { lineClient } from '~/utils/line'
import { msgWeeklyNotification } from '../notice-messages'
import { logger } from 'firebase-functions/v1'

export const handler = async () => {
  try {
    const userRepository = new UserRepository()
    const userList = await userRepository.getUserList()

    await Promise.all(
      userList.map(async (user) => {
        const fourCurrentRate = user.fourRecord.rate
        const fourLastWeekRate = user.fourRecord.lastWeekRate
        const threeCurrentRate = user.threeRecord.rate
        const threeLastWeekRate = user.threeRecord.lastWeekRate

        user.fourRecord.lastWeekRate = fourCurrentRate
        user.threeRecord.lastWeekRate = threeCurrentRate

        await userRepository.updateRate(user)

        await lineClient.pushMessage(
          user.lineId,
          msgWeeklyNotification(fourCurrentRate, fourLastWeekRate, threeCurrentRate, threeLastWeekRate)
        )
      })
    )
  } catch (err) {
    logger.log(err)
  }
}
