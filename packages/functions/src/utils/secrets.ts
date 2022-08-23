import 'dotenv/config'

interface FirebaseConfig {
  databaseURL: string
  storageBucket: string
  projectId: string
}

const FIREBASE_CONFIG = process.env.FIREBASE_CONFIG
const firebaseConfig = FIREBASE_CONFIG ? (JSON.parse(FIREBASE_CONFIG) as FirebaseConfig) : undefined
export const FIREBASE_PROJECT_ID = firebaseConfig ? firebaseConfig.projectId : (process.env.GOOGLE_CLOUD_ID as string)
export const FIREBASE_STORAGE_BUCKET = firebaseConfig ? firebaseConfig.storageBucket : ''

export const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL as string
export const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY as string

export const LINE_MESSAGING_CHANNEL_ACCESS_TOKEN = process.env.LINE_MESSAGING_CHANNEL_ACCESS_TOKEN as string
export const LINE_MESSAGING_CHANNEL_SECRET = process.env.LINE_MESSAGING_CHANNEL_SECRET as string

// Other
export const MY_LINE_LINK = process.env.MY_LINE_LINK as string
