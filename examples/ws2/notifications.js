import { args, debug } from '../util/setup.js'
import WSv2 from '../../lib/transports/ws2.js'

const { apiKey, apiSecret } = args

async function execute () {
  const ws = new WSv2({
    apiKey,
    apiSecret,
    transform: true
  })
  ws.on('error', e => debug('WSv2 error: %s', e.message | e))
  await ws.open()
  await ws.auth()

  ws.onNotification({ type: '*' }, (n) => {
    debug('recv notification: %j', n.toJS())
  })
}

execute()
