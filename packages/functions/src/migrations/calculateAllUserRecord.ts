import '../alias'
import { db } from '~/utils/firebase'

interface Result {
  people: 3 | 4
  round: 1 | 2
  scoreList: { participantId: string; score: number; order: number }[]
  time: number
}

interface User {
  lineId: string
  name: string
  rate: number
}

interface NewUser {
  lineId: string
  name: string
  threeRecord: {
    rate: number
    rankHistory: number[]
    gameCount: number
    rankCount: number
    firstCount: number
    secoundCount: number
    thirdCount: number
    minusCount: number
  }
  fourRecord: {
    rate: number
    rankHistory: number[]
    gameCount: number
    rankCount: number
    firstCount: number
    secoundCount: number
    thirdCount: number
    fourCount: number
    minusCount: number
  }
}

;(async () => {
  try {
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

    console.info(results)

    const usersSnapshot = await db.collection('users').get()
    const users: User[] = []
    usersSnapshot.forEach((doc) => {
      const data = doc.data()
      if (data.lineId == '123456789') {
        return
      }
      users.push({
        lineId: data.lineId,
        name: data.name,
        rate: data.rate
      })
    })

    const newUsers: NewUser[] = []

    users.forEach((user) => {
      const threeRankHistory: number[] = []
      let threeGameCount = 0
      let threeRankCount = 0
      let threeFirstCount = 0
      let threeSecoundCount = 0
      let threeThirdCount = 0
      let threeMinusCount = 0
      const fourRankHistory: number[] = []
      let fourGameCount = 0
      let fourRankCount = 0
      let fourFirstCount = 0
      let fourSecoundCount = 0
      let fourThirdCount = 0
      let fourFourthCount = 0
      let fourMinusCount = 0

      results.forEach((result) => {
        result.scoreList.forEach((item) => {
          if (item.participantId === user.lineId) {
            if (result.people === 3) {
              threeGameCount++
              threeRankCount += item.order
              threeRankHistory.push(item.order)
              if (item.order === 1) {
                threeFirstCount++
              } else if (item.order === 2) {
                threeSecoundCount++
              } else if (item.order === 3) {
                threeThirdCount++
              }
              if (item.score < 0) {
                threeMinusCount++
              }
            } else if (result.people === 4) {
              fourGameCount++
              fourRankCount += item.order
              fourRankHistory.push(item.order)
              if (item.order === 1) {
                fourFirstCount++
              } else if (item.order === 2) {
                fourSecoundCount++
              } else if (item.order === 3) {
                fourThirdCount++
              } else if (item.order === 4) {
                fourFourthCount++
              }
              if (item.score < 0) {
                fourMinusCount++
              }
            }
          }
        })
      })

      const newUser: NewUser = {
        lineId: user.lineId,
        name: user.name,
        threeRecord: {
          rate: 0,
          rankHistory: threeRankHistory.slice(-10),
          gameCount: threeGameCount,
          rankCount: threeRankCount,
          firstCount: threeFirstCount,
          secoundCount: threeSecoundCount,
          thirdCount: threeThirdCount,
          minusCount: threeMinusCount
        },
        fourRecord: {
          rate: 0,
          rankHistory: fourRankHistory.slice(-10),
          gameCount: fourGameCount,
          rankCount: fourRankCount,
          firstCount: fourFirstCount,
          secoundCount: fourSecoundCount,
          thirdCount: fourThirdCount,
          fourCount: fourFourthCount,
          minusCount: fourMinusCount
        }
      }

      newUsers.push(newUser)
      db.collection('newUser').doc(newUser.lineId).set(newUser)
    })

    console.info(newUsers)
  } catch (err) {
    console.error(err)
  }
})()
