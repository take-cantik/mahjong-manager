import { css } from '@emotion/react'
import dynamic from 'next/dynamic'
import type { ComponentPropsWithRef } from 'react'

import * as styles from './styles'
import { createOptions } from './util'

interface ResultChartProps extends ComponentPropsWithRef<'div'> {
  people: 3 | 4
  rankList: number[]
}

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export const ResultChart = ({ people, rankList }: ResultChartProps): JSX.Element => {
  const options = createOptions(people)

  const series: ApexAxisChartSeries | ApexNonAxisChartSeries = [
    {
      name: '順位',
      data: rankList
    }
  ]

  const wrapper = css`
    ${styles.common};
    ${people === 4 ? styles.four : styles.three};
  `

  return (
    <div css={wrapper}>
      <Chart options={options} series={series} height="100%" />
    </div>
  )
}
