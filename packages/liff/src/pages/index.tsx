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

        <table style={{ margin: 'auto' }}>
          <tbody>
            <tr>
              <td>LINE表示名</td>
              <td>：{user!.name}</td>
            </tr>
            <tr>
              <td>userUid</td>
              <td>：{user!.lineId}</td>
            </tr>
            <tr>
              <td>rate</td>
              <td>：{user!.rate}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </DefaultLayout>
  )
}

export default HomePage
