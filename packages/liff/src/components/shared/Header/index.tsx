import type { ComponentPropsWithRef, ForwardedRef } from 'react'

import * as styles from './styles'

interface HeaderProps extends ComponentPropsWithRef<'header'> {
  forwardRef?: ForwardedRef<HTMLDivElement>
}

export const Header = ({ forwardRef, ...props }: HeaderProps): JSX.Element => {
  return (
    <header css={styles.header} ref={forwardRef} {...props}>
      <h2 css={styles.title}>じゃんま!</h2>
    </header>
  )
}
