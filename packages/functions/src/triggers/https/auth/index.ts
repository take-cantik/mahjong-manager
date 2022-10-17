import axios from 'axios'
import { logger, region, RuntimeOptions } from 'firebase-functions/v1'
import { auth } from '~/utils/firebase'
import { CallableContext } from 'firebase-functions/v1/https'

const app = async (data: { idToken: string; lineChannelId: string; uid: string }, _: CallableContext) => {
  try {
    const { idToken, lineChannelId, uid } = data

    console.info(data, idToken, lineChannelId, process.env.FIREBASE_DEBUG_MODE)
    if (process.env.FIREBASE_DEBUG_MODE !== 'true') {
      const params = new URLSearchParams()
      params.append('id_token', idToken)
      params.append('client_id', lineChannelId)
      await axios.post('https://api.line.me/oauth2/v2.1/verify', params)
    }

    const token = await auth.createCustomToken(uid)

    return { token }
  } catch (err) {
    logger.error(err)
  }
}

const runtimeOpts: RuntimeOptions = {
  timeoutSeconds: 540,
  memory: '1GB'
}

module.exports = region('asia-northeast1').runWith(runtimeOpts).https.onCall(app)
