import { css } from '@emotion/react'

import * as styles from './styles'
import { colorTheme } from './theme/color'
import { sizeTheme } from './theme/size'

export interface RankingItemProps {
  rank: number
  name: string
  rate: number
}

export const RankingItem = ({ name, rank, rate }: RankingItemProps) => {
  const rankStyle = css`
    ${styles.rank};
    ${rank === 1 ? colorTheme.first : rank === 2 ? colorTheme.second : rank === 3 ? colorTheme.third : colorTheme.other}
    ${rank < 4 ? sizeTheme.lerge.rank : sizeTheme.normal.rank}
  `

  const unitStyles = css`
    ${rank < 4 ? sizeTheme.lerge.unit : sizeTheme.normal.unit}
  `

  const rateStyle = css`
    ${styles.rate};
    ${rank < 4 ? sizeTheme.lerge.rate : sizeTheme.normal.rate}
  `

  return (
    <div css={styles.common}>
      <div css={styles.wrapper}>
        <p css={rankStyle}>
          {rank}
          <span css={unitStyles}>位</span>
        </p>
        <p css={styles.name}>{name}</p>
      </div>
      <p css={rateStyle}>{rate}</p>
    </div>
  )
}
