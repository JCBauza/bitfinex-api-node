import { args, debug } from '../util/setup.js'
import WSv2 from '../../lib/transports/ws2.js'

const { apiKey, apiSecret } = args
const symbol = 'fUSD'

async function execute () {
  const ws = new WSv2({
    apiKey,
    apiSecret,
    transform: true
  })
  ws.on('error', e => debug('WSv2 error: %s', e.message | e))
  await ws.open()
  await ws.auth()

  ws.onFundingInfoUpdate({}, fi => {
    debug('fl: %j', fi.toJS())
    ws.close()
  })

  ws.requestCalc([`funding_sym_${symbol}`])
}

execute()
