import { getApps, initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'
import { firebaseAdminOptions } from './config'

if (getApps().length === 0) {
  initializeApp(firebaseAdminOptions)
}

export const auth = getAuth()
export const db = getFirestore()
