import '../alias'
import { db } from '~/utils/firebase'
import { firestore } from 'firebase-admin'
;(async () => {
  try {
    const snapshot = await db.collection('result').get()
    const newResults: any = []
    snapshot.docs.forEach((doc) => {
      const scoreList = []
      const length = doc.data().scoreList.length
      const docScoreList = doc.data().scoreList
      const docPList = doc.data().participantIdList
      for (let i = 0; i < length; i++) {
        const object = {
          score: docScoreList[i],
          participantId: docPList[i],
          order: i + 1
        }
        scoreList.push(object)
      }
      const time = firestore.Timestamp.fromDate(
        new Date(doc.data().time.replace(/年|月/g, '/').replace('日', ' ').replace('時', ':').replace('分', ''))
      )

      newResults.push({
        people: doc.data().people,
        round: doc.data().round,
        time,
        scoreList
      })

      db.collection('results').doc(String(time.seconds)).set({
        people: doc.data().people,
        round: doc.data().round,
        time,
        scoreList
      })
    })

    console.info(newResults)
  } catch (err) {
    console.error(err)
  }
})()
