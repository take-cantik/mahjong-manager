import type { ComponentPropsWithRef } from 'react'

import { ResultChart } from '../ResultChart'
import * as styles from './styles'

interface ResultTransitionProps extends ComponentPropsWithRef<'section'> {
  people: 3 | 4
  rankList: number[]
}

export const ResultTransition = ({ people, rankList }: ResultTransitionProps) => {
  return (
    <section css={styles.common}>
      <h2 css={styles.title}>対戦記録（過去10戦）</h2>
      <ResultChart people={people} rankList={rankList} />
    </section>
  )
}
