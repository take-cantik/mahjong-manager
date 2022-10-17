import type { FirebaseApp } from 'firebase/app'
import { initializeApp } from 'firebase/app'
import type { Auth } from 'firebase/auth'
import { getAuth } from 'firebase/auth'
import type { Firestore } from 'firebase/firestore'
import { getFirestore } from 'firebase/firestore'
import type { Functions } from 'firebase/functions'
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions'

import { firebaseConfig } from './config'

export const firebase: FirebaseApp = initializeApp(firebaseConfig)
export const firestore: Firestore = getFirestore(firebase)
export const auth: Auth = getAuth(firebase)
export const functions: Functions = getFunctions(firebase, 'asia-northeast1')

if (process.env.NODE_ENV === 'development') {
  connectFunctionsEmulator(functions, 'localhost', 5001)
}
