import { css } from '@emotion/react'

import { colors } from '~/styles/themes'

export const common = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
`

export const error = css`
  font-size: 2rem;
`

export const link = css`
  width: 120px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background: ${colors.red};
  color: ${colors.white};
  font-size: 1.6rem;
`
