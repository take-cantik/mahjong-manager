import { css } from '@emotion/react'

import { colors } from '~/styles/themes'
import { fonts } from '~/styles/themes/fonts'

export const common = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  position: relative;
  padding: 10px 0px;

  &::after {
    content: '';
    width: 100%;
    height: 1px;
    display: block;
    position: absolute;
    bottom: 0;
    background: ${colors.black.lighten[2]};
  }
`

export const wrapper = css`
  width: 100%;
  display: flex;
  gap: 20px;
  align-items: center;
  overflow-x: hidden;
`

export const rank = css`
  width: 40px;
  flex-shrink: 0;
`

export const name = css`
  width: 100%;
  font-size: 1.6rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

export const rate = css`
  font-weight: bold;
  font-family: ${fonts.montserrat};
`
