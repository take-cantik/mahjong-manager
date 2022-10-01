import type { ComponentPropsWithRef } from 'react'

import type { InformationProps } from '~/components/shared/Information'
import { Information } from '~/components/shared/Information'

import * as styles from './styles'

interface ResultDetailProps extends ComponentPropsWithRef<'section'> {
  recordList: InformationProps[]
}

export const ResultDetail = ({ recordList }: ResultDetailProps): JSX.Element => {
  return (
    <section css={styles.common}>
      <h2 css={styles.title}>対戦詳細</h2>
      <div css={styles.wrapper}>
        {recordList.map((record) => (
          <Information label={record.label} content={record.content} key={record.label} />
        ))}
      </div>
    </section>
  )
}
