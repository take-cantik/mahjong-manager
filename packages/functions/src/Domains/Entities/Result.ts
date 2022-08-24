export interface ScoreResult {
  participantId: string
  score: number
  order: number
}

export interface Result {
  time: number
  people: 3 | 4
  round: 1 | 2
  scoreList: ScoreResult[]
}
