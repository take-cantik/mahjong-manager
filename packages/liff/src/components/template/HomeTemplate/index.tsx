import { useContext } from 'react'

import { Header } from '~/components/shared/Header'
import type { InformationProps } from '~/components/shared/Information'
import { Profile } from '~/components/shared/Profile'
import { ResultDetail } from '~/components/shared/ResultDetail'
import { ResultTransition } from '~/components/shared/ResultTransition'
import { TabMenu } from '~/components/shared/TabMenu'
import { AuthContext } from '~/contexts/AuthContext'

import * as styles from './styles'

export const HomeTemplate = () => {
  const { user } = useContext(AuthContext)
  const testData: InformationProps[] = [
    {
      label: '対戦数',
      content: '45'
    },
    {
      label: '平均順位',
      content: '2.5'
    },
    {
      label: '1位率',
      content: '25%'
    },
    {
      label: '2位率',
      content: '25%'
    },
    {
      label: '3位率',
      content: '25%'
    },
    {
      label: '4位率',
      content: '25%'
    },
    {
      label: '飛び率',
      content: '1.55%'
    }
  ]

  return (
    <>
      <Header />
      <main css={styles.main}>
        <Profile name={user!.name} rate={user!.threeRecord.rate} />
        <ResultTransition rankList={[1, 2, 1, 3, 3, 2, 4, 2]} />
        <ResultDetail recordList={testData} />
      </main>
      <TabMenu />
    </>
  )
}
