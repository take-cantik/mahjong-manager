import { User } from '@line/bot-sdk'

export interface UserRepositoryInterface {
  getUser: (lineId: string) => Promise<User | null>
  addUser: (user: User) => Promise<void>
}
