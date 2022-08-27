import { css } from '@emotion/react'
import type { ComponentPropsWithRef, ForwardedRef } from 'react'

import { colors } from '~/styles/themes'

interface HeaderProps extends ComponentPropsWithRef<'header'> {
  forwardRef?: ForwardedRef<HTMLDivElement>
}

const header = css`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  background: ${colors.green};
  color: ${colors.white};
  font-size: 2rem;
  font-weight: bold;
`

export const Header = ({ forwardRef, ...props }: HeaderProps): JSX.Element => {
  return (
    <header css={header} ref={forwardRef} {...props}>
      <h2>じゃんま!</h2>
    </header>
  )
}
