import type { NextPage } from 'next'
import { useContext } from 'react'

import { AuthContext } from '~/contexts/AuthContext'
import { DefaultLayout } from '~/layouts/Default'

const HomePage: NextPage = () => {
  const { user } = useContext(AuthContext)

  return (
    <DefaultLayout>
      <div style={{ marginTop: '20%' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: 8, textAlign: 'center' }}>麻雀レート管理アプリ</h1>

        <div style={{ margin: 'auto' }}>
          <h2>LINE表示名</h2>
          <p>：{user!.name}</p>
          <h3>userUid</h3>
          <p>：{user!.lineId}</p>
          <h2>threeRate</h2>
          <p>：{user!.threeRecord.rate}</p>
          <h2>fourRate</h2>
          <p>：{user!.fourRecord.rate}</p>
        </div>
      </div>
    </DefaultLayout>
  )
}

export default HomePage
