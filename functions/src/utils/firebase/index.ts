import admin from 'firebase-admin'
import { firebaseAdminOptions } from './config'

if (admin.apps.length === 0) {
  admin.initializeApp(firebaseAdminOptions)
}

// Auth
export const auth = admin.auth()

// Firestore
export const db = admin.firestore()

export { admin }
