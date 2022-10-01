import type { ComponentPropsWithRef } from 'react'

import type { InformationProps } from '~/components/shared/Information'
import { Information } from '~/components/shared/Information'

interface ResultDetailProps extends ComponentPropsWithRef<'section'> {
  recordList: InformationProps[]
}

export const ResultDetail = ({ recordList }: ResultDetailProps): JSX.Element => {
  return (
    <section>
      <h2>対戦詳細</h2>
      <div>
        {recordList.map((record) => (
          <Information label={record.label} content={record.content} key={record.label} />
        ))}
      </div>
    </section>
  )
}
