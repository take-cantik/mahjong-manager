import { css } from '@emotion/react'
import dynamic from 'next/dynamic'
import type { ComponentPropsWithRef } from 'react'
import { useRecoilValue } from 'recoil'

import { gameState } from '~/state/game'

import * as styles from './styles'
import { createOptions } from './util'

interface ResultChartProps extends ComponentPropsWithRef<'div'> {
  rankList: number[]
}

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export const ResultChart = ({ rankList }: ResultChartProps): JSX.Element => {
  const game = useRecoilValue(gameState)

  const options = createOptions(game.people)

  const series: ApexAxisChartSeries | ApexNonAxisChartSeries = [
    {
      name: '順位',
      data: rankList
    }
  ]

  const wrapper = css`
    ${styles.common};
    ${game.people === 4 ? styles.four : styles.three};
  `

  return (
    <div css={wrapper}>
      <Chart options={options} series={series} height="100%" />
    </div>
  )
}
