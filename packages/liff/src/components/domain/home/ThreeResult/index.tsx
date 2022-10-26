import { useContext } from 'react'

import { Profile } from '~/components/shared/Profile'
import { ResultDetail } from '~/components/shared/ResultDetail'
import { ResultTransition } from '~/components/shared/ResultTransition'
import { AuthContext } from '~/contexts/AuthContext'

import { createThreeRecord } from './util'

export const ThreeResult = () => {
  const { user } = useContext(AuthContext)
  const recordList = createThreeRecord(user!.threeRecord)

  return (
    <>
      <Profile name={user!.name} rate={user!.threeRecord.rate} />
      <ResultTransition people={3} rankList={user!.threeRecord.rankHistory} />
      <ResultDetail recordList={recordList} />
    </>
  )
}
