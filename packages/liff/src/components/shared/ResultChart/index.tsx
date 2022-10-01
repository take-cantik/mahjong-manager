import type { ApexOptions } from 'apexcharts'
import dynamic from 'next/dynamic'
import type { ComponentPropsWithRef } from 'react'

import { colors } from '~/styles/themes'
import { fonts } from '~/styles/themes/fonts'

import * as styles from './styles'

interface ResultChartProps extends ComponentPropsWithRef<'div'> {
  rankList: number[]
}

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export const ResultChart = ({ rankList }: ResultChartProps): JSX.Element => {
  const options: ApexOptions = {
    chart: {
      type: 'line',
      toolbar: {
        show: false
      },
      animations: {
        enabled: false
      }
    },
    markers: {
      size: 4,
      colors: colors.green,
      strokeWidth: 0
    },
    stroke: {
      width: 2
    },
    xaxis: {
      labels: {
        show: false
      }
    },
    yaxis: {
      reversed: true,
      labels: {
        style: {
          colors: colors.black.primary,
          fontSize: '14px',
          fontWeight: 500,
          fontFamily: fonts.noto_sans_jp
        },
        formatter: (val) => `${val}位`
      }
    },
    colors: [colors.green]
  }

  const series: ApexAxisChartSeries | ApexNonAxisChartSeries = [
    {
      name: '順位',
      data: rankList
    }
  ]

  return (
    <div css={styles.common}>
      <Chart options={options} series={series} height="100%" />
    </div>
  )
}
