import * as styles from './styles'

export const Loader = (): JSX.Element => {
  return (
    <div css={styles.common}>
      <span css={styles.loader} />
    </div>
  )
}
