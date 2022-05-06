export interface ResultRepositoryInterface {
  getRecentDocId: () => Promise<string>
  setTime: (docId: string, time: string) => Promise<void>
  setGame: (docId: string, people: 3 | 4, round: 1 | 2) => Promise<void>
  setScore: (docId: string, participantIdList: string[], scoreList: number[]) => Promise<void>
}
