import { css } from '@emotion/react'

import { colors } from '~/styles/themes'

export const header = css`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  padding: 0 16px;
  background: ${colors.green};
  color: ${colors.white};
`

export const title = css`
  font-size: 2rem;
  font-weight: bold;
`
