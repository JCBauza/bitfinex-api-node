import { args, debug } from '../util/setup.js'
import WSv2 from '../../lib/transports/ws2.js'

const { apiKey, apiSecret } = args

async function execute () {
  const ws = new WSv2({
    apiKey,
    apiSecret
  })
  ws.on('error', e => debug('WSv2 error: %s', e.message | e))

  // register a callback for any order snapshot that comes in (account orders)
  ws.onOrderSnapshot({}, (orders) => {
    debug(`order snapshot: ${JSON.stringify(orders, null, 2)}`)
  })

  await ws.open()
  debug('open')

  await ws.auth()
  debug('authenticated')

  // do something with authenticated ws stream
  await ws.close()
}

execute()
