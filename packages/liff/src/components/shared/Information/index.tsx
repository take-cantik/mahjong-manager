import * as styles from './styles'

export interface InformationProps {
  label: string
  content: string
}

export const Information = ({ content, label }: InformationProps): JSX.Element => {
  return (
    <div css={styles.common}>
      <p css={styles.label}>{label}</p>
      <p css={styles.content}>{content}</p>
    </div>
  )
}
