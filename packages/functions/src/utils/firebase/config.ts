import admin from 'firebase-admin'
import { FIREBASE_DATABASE_URL } from '~/utils/secrets'

export const firebaseAdminOptions: admin.AppOptions = {
  credential: admin.credential.applicationDefault(),
  databaseURL: FIREBASE_DATABASE_URL
}
