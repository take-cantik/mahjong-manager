import { Result } from '../Entities/Result'

export interface ResultRepositoryInterface {
  getRecentDoc: () => Promise<Result>
  setTime: (time: string) => Promise<string>
  setGame: (docId: string, people: 3 | 4, round: 1 | 2) => Promise<void>
  setScore: (docId: string, participantIdList: string[], scoreList: number[]) => Promise<void>
  deleteRecentDoc: () => Promise<void>
}
