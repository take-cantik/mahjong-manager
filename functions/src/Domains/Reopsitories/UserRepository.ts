import { User } from '../Entities/User'

export interface UserRepositoryInterface {
  getUser: (lineId: string) => Promise<User | null>
  addUser: (user: User) => Promise<void>
}
