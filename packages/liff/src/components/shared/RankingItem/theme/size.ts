import { css } from '@emotion/react'
import type { SerializedStyles } from '@emotion/utils'

type SizeTheme = {
  lerge: {
    rank: SerializedStyles
    unit: SerializedStyles
    rate: SerializedStyles
  }
  normal: {
    rank: SerializedStyles
    unit: SerializedStyles
    rate: SerializedStyles
  }
}

export const sizeTheme: SizeTheme = {
  lerge: {
    rank: css`
      font-size: 2.4rem;
    `,
    unit: css`
      font-size: 2rem;
    `,
    rate: css`
      font-size: 2.4rem;
    `
  },
  normal: {
    rank: css`
      font-size: 2rem;
    `,
    unit: css`
      font-size: 1.6rem;
    `,
    rate: css`
      font-size: 2rem;
    `
  }
}
