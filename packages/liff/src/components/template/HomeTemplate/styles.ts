import { css } from '@emotion/react'

import { colors } from '~/styles/themes'

export const main = css`
  width: 100%;
  height: 100vh;
  padding: 40px 16px 100px;
  background: ${colors.black.lighten[5]};
  overflow-y: scroll;
`
