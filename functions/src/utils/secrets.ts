import 'dotenv/config'

// LINE
export const LINE_MESSAGING_CHANNEL_ACCESS_TOKEN = process.env.LINE_MESSAGING_CHANNEL_ACCESS_TOKEN as string
export const LINE_MESSAGING_CHANNEL_SECRET = process.env.LINE_MESSAGING_CHANNEL_SECRET as string

// Firebase
export const FIREBASE_DATABASE_URL = process.env.DATABASE_URL as string
