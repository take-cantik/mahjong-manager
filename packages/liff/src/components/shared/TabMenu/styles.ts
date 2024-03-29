import { css } from '@emotion/react'

import { colors } from '~/styles/themes'

export const common = css`
  width: 100%;
  display: flex;
  position: absolute;
  bottom: 0;

  &::after {
    content: '';
    width: 100%;
    height: 34px;
    position: absolute;
    bottom: -34px;
    background: ${colors.black.lighten[5]};
  }
`
