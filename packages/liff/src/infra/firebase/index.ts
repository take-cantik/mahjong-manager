import type { FirebaseApp } from 'firebase/app'
import { initializeApp } from 'firebase/app'
import type { Firestore } from 'firebase/firestore'
import { getFirestore } from 'firebase/firestore'

import { firebaseConfig } from './config'

export const firebase: FirebaseApp = initializeApp(firebaseConfig)
export const firestore: Firestore = getFirestore(firebase)
