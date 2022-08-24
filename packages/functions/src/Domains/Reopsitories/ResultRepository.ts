import { Result, ScoreResult } from '../Entities/Result'

export interface ResultRepositoryInterface {
  getResult: (docId: string) => Promise<Result>
  setTime: (time: string) => Promise<string>
  setGame: (docId: string, people: 3 | 4, round: 1 | 2) => Promise<void>
  setScore: (docId: string, scoreList: ScoreResult[]) => Promise<void>
  deleteResult: (docId: string) => Promise<void>
}
