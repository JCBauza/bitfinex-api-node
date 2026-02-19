import { args, debug } from '../util/setup.js'
import WSv2 from '../../lib/transports/ws2.js'

const { apiKey, apiSecret } = args

async function execute () {
  const ws = new WSv2({
    apiKey,
    apiSecret,
    transform: true,
    orderOpBufferDelay: 250
  })
  ws.on('error', e => debug('WSv2 error: %s', e.message | e))
  await ws.open()
  await ws.auth()

  ws.onOrderSnapshot({}, async (snapshot) => {
    if (snapshot.length === 0) {
      debug('no orders to cancel')
    } else {
      debug('canceling %d orders', snapshot.length)

      await ws.cancelOrders(snapshot)
      debug('cancelled all orders')
    }
    await ws.close()
  })
}

execute()
