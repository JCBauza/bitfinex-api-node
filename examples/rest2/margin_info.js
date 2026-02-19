import _bfxUtil from 'bfx-api-node-util'
import { RESTv2 } from '../../index.js'
import { args, debug } from '../util/setup.js'

const { prepareAmount } = _bfxUtil
const { apiKey, apiSecret } = args

async function execute () {
  const rest = new RESTv2({
    apiKey,
    apiSecret,
    transform: true
  })
  debug('fetching margin info...')

  const info = await rest.marginInfo()
  const { userPL, userSwaps, marginBalance, marginNet } = info

  debug('')
  debug('Swaps: %d', userSwaps)
  debug('P/L: %s', prepareAmount(userPL))
  debug('Balance: %s', prepareAmount(marginBalance))
  debug('Net Balance: %s', prepareAmount(marginNet))
  debug('')
}

execute()
