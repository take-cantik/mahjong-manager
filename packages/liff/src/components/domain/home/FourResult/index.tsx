import { useContext } from 'react'

import type { InformationProps } from '~/components/shared/Information'
import { Profile } from '~/components/shared/Profile'
import { ResultDetail } from '~/components/shared/ResultDetail'
import { ResultTransition } from '~/components/shared/ResultTransition'
import { AuthContext } from '~/contexts/AuthContext'

export const FourResult = () => {
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
      <Profile name={user!.name} rate={user!.fourRecord.rate} />
      <ResultTransition rankList={user!.fourRecord.rankHistory} />
      <ResultDetail recordList={testData} />
    </>
  )
}
