import { AppOptions, cert } from 'firebase-admin/app'
import { FIREBASE_PROJECT_ID, GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY } from '../secrets'

export const firebaseAdminOptions: AppOptions = {
  credential: cert({
    projectId: FIREBASE_PROJECT_ID,
    clientEmail: GOOGLE_CLIENT_EMAIL,
    privateKey: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
  })
}
