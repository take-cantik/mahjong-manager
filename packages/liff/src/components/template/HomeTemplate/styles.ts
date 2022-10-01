import { css } from '@emotion/react'

import { colors } from '~/styles/themes'

export const main = css`
  width: 100%;
  height: calc(100vh - 120px);
  padding: 40px 16px;
  background: ${colors.black.lighten[5]};
`
