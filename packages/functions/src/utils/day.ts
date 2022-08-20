import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

dayjs.tz.setDefault('Asia/Tokyo')

export { dayjs }

export const getCurrentTime = () => {
  const now = new Date()
  return dayjs(now).tz().format('YYYY年MM月DD日HH時mm分')
}
