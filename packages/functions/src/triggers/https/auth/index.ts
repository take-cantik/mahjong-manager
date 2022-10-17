import axios from 'axios'
import express from 'express'
import { region, RuntimeOptions } from 'firebase-functions/v1'
import { auth } from '~/utils/firebase'

const app = express()

app.post('/verify', async (req, res) => {
  try {
    const idToken = req.body.idToken as string
    const lineChannelId = req.body.lineChannelId as string

    const verifyIdToken = await axios.post('https://api.line.me/oauth2/v2.1/verify', {
      id_token: idToken,
      client_id: lineChannelId
    })

    const token = await auth.createCustomToken(verifyIdToken.data.access_token)

    res.send({ token })
    res.json
  } catch {
    res.status(401).send({ message: 'Unauthenticated.' })
  }
})

const runtimeOpts: RuntimeOptions = {
  timeoutSeconds: 540,
  memory: '1GB'
}

module.exports = region('asia-northeast1').runWith(runtimeOpts).https.onRequest(app)
