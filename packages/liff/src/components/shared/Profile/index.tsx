import type { ComponentPropsWithRef } from 'react'

import * as styles from './styles'

interface ProfileProps extends ComponentPropsWithRef<'section'> {
  name: string
  rate: number
}

export const Profile = ({ name, rate }: ProfileProps): JSX.Element => {
  return (
    <section css={styles.common}>
      <h2 css={styles.name}>{name}</h2>
      <div css={styles.wrapper}>
        <p css={styles.label}>現在のレート</p>
        <h1 css={styles.rate}>{rate}</h1>
      </div>
    </section>
  )
}
