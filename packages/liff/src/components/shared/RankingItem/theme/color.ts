import { css } from '@emotion/react'
import type { SerializedStyles } from '@emotion/utils'

import { colors } from '~/styles/themes'

type ColorTheme = {
  first: SerializedStyles
  second: SerializedStyles
  third: SerializedStyles
  other: SerializedStyles
}

export const colorTheme: ColorTheme = {
  first: css`
    color: ${colors.gold};
  `,
  second: css`
    color: ${colors.silver};
  `,
  third: css`
    color: ${colors.bronze};
  `,
  other: css`
    color: ${colors.black.lighten[1]};
  `
}
