import '../alias'
import { StateRepository } from '~/Infrastructure/RepositoryImpl/Firebase/StateRepository'
;(async () => {
  const stateRepository = new StateRepository()
  try {
    await stateRepository.addState({
      currentState: 0
    })
  } catch (err) {
    console.error(err)
  }
})()
