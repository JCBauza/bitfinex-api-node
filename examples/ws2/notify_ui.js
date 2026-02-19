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

  ws.notifyUI({
    type: 'success',
    message: 'This is a test notification sent via the WSv2 API'
  })

  debug('notification sent')
  await ws.close()
}

execute()
