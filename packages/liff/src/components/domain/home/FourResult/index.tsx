import { useContext } from 'react'

import { Profile } from '~/components/shared/Profile'
import { ResultDetail } from '~/components/shared/ResultDetail'
import { ResultTransition } from '~/components/shared/ResultTransition'
import { AuthContext } from '~/contexts/AuthContext'

import { createFourRecord } from './util'

export const FourResult = () => {
  const { user } = useContext(AuthContext)
  const recordList = createFourRecord(user!.fourRecord)

  return (
    <>
      <Profile name={user!.name} rate={user!.fourRecord.rate} />
      <ResultTransition people={4} rankList={user!.fourRecord.rankHistory} />
      <ResultDetail recordList={recordList} />
    </>
  )
}
