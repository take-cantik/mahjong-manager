import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

import { NEXT_PUBLIC_LIFF_ID } from '~/utils/secret'

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const { accessToken } = request.query
  const verifyAccessToken = await axios.get(`https://api.line.me/oauth2/v2.1/verify?access_token=${accessToken}`)
  const lineChannelId = NEXT_PUBLIC_LIFF_ID.split('-')[0]

  if (verifyAccessToken.data.client_id === lineChannelId && verifyAccessToken.data.expires_in > 0) {
    return response.status(200).json({ isOk: true })
  } else {
    return response.status(401).json({ isOk: false })
  }
}
