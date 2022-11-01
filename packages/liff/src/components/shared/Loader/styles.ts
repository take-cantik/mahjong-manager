import { css } from '@emotion/react'

import { colors } from '~/styles/themes'

export const common = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const loader = css`
  width: 80px;
  height: 80px;
  margin: 40px auto;
  border-width: 0.8em;
  border-color: ${colors.green};
  opacity: 0.5;
  border-left-color: ${colors.black.lighten[6]};
  border-style: solid;
  border-radius: 50%;
  animation: loading 1s infinite linear;

  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
