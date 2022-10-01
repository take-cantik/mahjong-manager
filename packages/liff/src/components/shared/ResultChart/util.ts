import type { ApexOptions } from 'apexcharts'

import { colors } from '~/styles/themes'
import { fonts } from '~/styles/themes/fonts'

export const createOptions = (people: 3 | 4): ApexOptions => {
  return {
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
      min: 1,
      max: people,
      // TODO: ここの動きをちゃんと調べる. 一旦動いてるのでこのまま
      tickAmount: people === 4 ? 0 : 2,
      forceNiceScale: true,
      labels: {
        offsetX: -16,
        offsetY: 2,
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
}
