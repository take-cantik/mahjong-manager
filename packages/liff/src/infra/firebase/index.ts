import type { FirebaseApp } from 'firebase/app'
import { initializeApp } from 'firebase/app'
import type { Auth } from 'firebase/auth'
import { getAuth } from 'firebase/auth'
import type { Firestore } from 'firebase/firestore'
import { getFirestore } from 'firebase/firestore'

import { firebaseConfig } from './config'

export const firebase: FirebaseApp = initializeApp(firebaseConfig)
export const firestore: Firestore = getFirestore(firebase)
export const auth: Auth = getAuth(firebase)
