import type { ComponentPropsWithRef } from 'react'

import { ResultChart } from '../ResultChart'
import * as styles from './styles'

interface ResultTransitionProps extends ComponentPropsWithRef<'section'> {
  rankList: number[]
}

export const ResultTransition = ({ rankList }: ResultTransitionProps) => {
  return (
    <section css={styles.common}>
      <h2 css={styles.title}>対戦記録（過去10戦）</h2>
      <ResultChart rankList={rankList} />
    </section>
  )
}
