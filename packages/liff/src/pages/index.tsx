import { css } from '@emotion/react'
import type { NextPage } from 'next'
import { useContext } from 'react'

import { Header } from '~/components/shared/Header'
import { Profile } from '~/components/shared/Profile'
import { AuthContext } from '~/contexts/AuthContext'
import { colors } from '~/styles/themes'

const main = css`
  width: 100%;
  padding: 40px 16px;
  background: ${colors.black.lighten[5]};
`

const HomePage: NextPage = () => {
  const { user } = useContext(AuthContext)

  return (
    <>
      <Header />
      <main css={main}>
        <Profile name={user!.name} rate={user!.threeRecord.rate} />
      </main>
    </>
  )
}

export default HomePage
