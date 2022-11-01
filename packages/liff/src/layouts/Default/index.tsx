import type { FC } from 'react'
import { useContext } from 'react'

import { Error } from '~/components/shared/Error'
import { Loader } from '~/components/shared/Loader'
import { AuthContext } from '~/contexts/AuthContext'

import type { LayoutProps } from '../types'
import * as styles from './styles'

export const DefaultLayout: FC<LayoutProps> = ({ children }) => {
  const { isError, isLogIn } = useContext(AuthContext)

  return (
    <div css={styles.common}>
      {isError && <Error />}
      {!isError && !isLogIn && <Loader />}
      {!isError && isLogIn && children}
    </div>
  )
}
