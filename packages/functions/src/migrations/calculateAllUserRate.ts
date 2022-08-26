import '../alias'
import { db } from '~/utils/firebase'

interface User {
  lineId: string
  name: string
  threeRecord: {
    rate: number
    rankHistory: number[]
    gameCount: number
    rankCount: number
    firstCount: number
    secondCount: number
    thirdCount: number
    minusCount: number
  }
  fourRecord: {
    rate: number
    rankHistory: number[]
    gameCount: number
    rankCount: number
    firstCount: number
    secondCount: number
    thirdCount: number
    fourthCount: number
    minusCount: number
  }
}

interface Result {
  people: 3 | 4
  round: 1 | 2
  scoreList: { participantId: string; score: number; order: number }[]
  time: number
}

interface Participant {
  lineId: string
  name: string
  threeRate: number
  fourRate: number
  score: number
  order: number
}

;(async () => {
  try {
    const usersSnapshot = await db.collection('users').get()
    const users: User[] = []
    usersSnapshot.forEach((doc) => {
      const data = doc.data()
      if (data.lineId == '123456789') {
        return
      }
      const user: User = {
        lineId: data.lineId,
        name: data.name,
        threeRecord: data.threeRecord,
        fourRecord: data.fourRecord
      }
      user.fourRecord.rate = 1600
      user.threeRecord.rate = 1600
      users.push(user)
    })

    const resultsSnapshot = await db.collection('results').orderBy('time').get()
    const results: Result[] = []
    resultsSnapshot.forEach((doc) => {
      const data = doc.data()
      results.push({
        people: data.people,
        round: data.round,
        scoreList: data.scoreList,
        time: data.time.seconds
      })
    })

    results.forEach((result) => {
      if (result.people === 4) {
        // 四麻の計算
        const rankValueList0 = [200, 100, 50, 20]
        const rankValueList3000 = [80, 20, -5, -20]
        const rankValueList6000 = [50, 20, -20, -50]
        const rankValueList9000 = [20, 5, -40, -100]
        let defaultScore = 0
        let fourRateTotal = 0

        // 参加者の配列作成
        const participantList: Participant[] = []
        users.forEach((user) => {
          result.scoreList.forEach((item) => {
            if (user.lineId === item.participantId) {
              defaultScore += item.score
              fourRateTotal += user.fourRecord.rate
              participantList.push({
                lineId: user.lineId,
                name: user.name,
                threeRate: user.threeRecord.rate,
                fourRate: user.fourRecord.rate,
                score: item.score,
                order: item.order
              })
            }
          })
        })

        // レート計算
        defaultScore /= participantList.length
        participantList.forEach((participant) => {
          const rankValue =
            participant.fourRate < 3000
              ? rankValueList0[participant.order - 1]
              : participant.fourRate < 6000
              ? rankValueList3000[participant.order - 1]
              : participant.fourRate < 9000
              ? rankValueList6000[participant.order - 1]
              : rankValueList9000[participant.order - 1]

          const scoreDiff = (participant.score - defaultScore) / 400

          const otherRateDiff = ((fourRateTotal - participant.fourRate) / 3 - participant.fourRate) / 100

          const rateDiff =
            rankValue + otherRateDiff < 0 && participant.order < 3 ? scoreDiff : rankValue + scoreDiff + otherRateDiff

          participant.fourRate += Math.floor(rateDiff * result.round)

          if (participant.fourRate < 0) {
            participant.fourRate = 0
          }
        })

        // レート更新
        users.forEach((user, index) => {
          participantList.forEach((participant) => {
            if (user.lineId === participant.lineId) {
              user.fourRecord.rate = participant.fourRate
              user.threeRecord.rate = participant.threeRate
              users[index] = user
            }
          })
        })
      } else {
        // 三麻の計算
        const rankValueList0 = [100, 40, 0]
        const rankValueList3000 = [50, 10, -20]
        const rankValueList6000 = [30, 0, -30]
        const rankValueList9000 = [20, 0, -50]
        let defaultScore = 0
        let threeRateTotal = 0

        // 参加者の配列作成
        const participantList: Participant[] = []
        users.forEach((user) => {
          result.scoreList.forEach((item) => {
            if (user.lineId === item.participantId) {
              defaultScore += item.score
              threeRateTotal += user.threeRecord.rate
              participantList.push({
                lineId: user.lineId,
                name: user.name,
                threeRate: user.threeRecord.rate,
                fourRate: user.fourRecord.rate,
                score: item.score,
                order: item.order
              })
            }
          })
        })

        // レート計算
        defaultScore /= participantList.length
        participantList.forEach((participant) => {
          const rankValue =
            participant.threeRate < 3000
              ? rankValueList0[participant.order - 1]
              : participant.threeRate < 6000
              ? rankValueList3000[participant.order - 1]
              : participant.threeRate < 9000
              ? rankValueList6000[participant.order - 1]
              : rankValueList9000[participant.order - 1]

          const scoreDiff = (participant.score - defaultScore) / 400

          const otherRateDiff = ((threeRateTotal - participant.threeRate) / 2 - participant.threeRate) / 100

          const rateDiff =
            rankValue + otherRateDiff < 0 && participant.order < 3 ? scoreDiff : rankValue + scoreDiff + otherRateDiff

          participant.threeRate += Math.floor(rateDiff * result.round)

          if (participant.threeRate < 0) {
            participant.threeRate = 0
          }
        })

        // レート更新
        users.forEach((user, index) => {
          participantList.forEach((participant) => {
            if (user.lineId === participant.lineId) {
              user.fourRecord.rate = participant.fourRate
              user.threeRecord.rate = participant.threeRate
              users[index] = user
            }
          })
        })
      }
    })

    users.forEach((user) => {
      db.collection('users').doc(user.lineId).update(user)
    })
  } catch (err) {
    console.error(err)
  }
})()
