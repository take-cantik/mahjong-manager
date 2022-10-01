import { css } from '@emotion/react'

import { fonts } from '~/styles/themes/fonts'

export const common = css`
  width: 100%;
`

export const name = css`
  font-size: 2rem;
  font-weight: bold;
`

export const wrapper = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 9px;
  padding-top: 42px;
`

export const label = css`
  font-size: 1.4rem;
`

export const rate = css`
  font: bold 4.4rem ${fonts.montserrat};
`
