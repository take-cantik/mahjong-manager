import { css } from '@emotion/react'
import type { ComponentPropsWithRef } from 'react'

import { colors } from '~/styles/themes'

import * as styles from './styles'

interface TabButtonProps extends ComponentPropsWithRef<'button'> {
  active: boolean
}

export const TabButton = ({ active, children, ...props }: TabButtonProps): JSX.Element => {
  const button = css`
    ${styles.common};
    background: ${active ? colors.green : colors.black.lighten[2]};
  `
  return (
    <button css={button} {...props}>
      {children}
    </button>
  )
}
