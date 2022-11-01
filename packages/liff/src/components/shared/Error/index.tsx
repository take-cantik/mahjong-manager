import { NEXT_PUBLIC_MY_LINE_LINK } from '~/utils/secret'

import * as styles from './styles'

export const Error = (): JSX.Element => {
  return (
    <div css={styles.common}>
      <h3 css={styles.error}>ログインに失敗しました</h3>
      <a href={NEXT_PUBLIC_MY_LINE_LINK} target="_blank" rel="noopener noreferrer" css={styles.link}>
        報告する
      </a>
    </div>
  )
}
