import axios from 'axios'
import { region, RuntimeOptions } from 'firebase-functions/v1'
import { auth } from '~/utils/firebase'
import functions from 'firebase-functions'
import { CallableContext } from 'firebase-functions/v1/https'

const app = async (data: { idToken: string; lineChannelId: string; uid: string }, _: CallableContext) => {
  try {
    const idToken = data.idToken
    const lineChannelId = data.lineChannelId
    const uid = data.uid

    if (process.env.NODE_ENV !== 'development') {
      await axios.post('https://api.line.me/oauth2/v2.1/verify', {
        id_token: idToken,
        client_id: lineChannelId
      })
    }

    const token = await auth.createCustomToken(uid)

    return { token }
  } catch {
    throw new functions.https.HttpsError('unknown', 'error')
  }
}

const runtimeOpts: RuntimeOptions = {
  timeoutSeconds: 540,
  memory: '1GB'
}

module.exports = region('asia-northeast1').runWith(runtimeOpts).https.onCall(app)
