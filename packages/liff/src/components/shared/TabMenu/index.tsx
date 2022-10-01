import { TabButton } from '../TabButton'
import * as styles from './styles'

export const TabMenu = () => {
  return (
    <menu css={styles.common}>
      <TabButton active={true}>四人麻雀</TabButton>
      <TabButton active={false}>三人麻雀</TabButton>
    </menu>
  )
}
