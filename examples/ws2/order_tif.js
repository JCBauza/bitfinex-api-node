import _bfxModels from 'bfx-api-node-models'
import { args, debug } from '../util/setup.js'
import WSv2 from '../../lib/transports/ws2.js'

const { Order } = _bfxModels
const { apiKey, apiSecret } = args

const o = new Order({
  cid: Date.now(),
  symbol: 'tBTCUSD',
  price: 17833.5,
  amount: -0.02,
  type: Order.type.LIMIT,
  tif: '2019-03-08 15:00:00'
})

async function execute () {
  const ws = new WSv2({
    apiKey,
    apiSecret,
    transform: true
  })
  ws.on('error', e => debug('WSv2 error: %s', e.message | e))
  await ws.open()
  await ws.auth()

  o.registerListeners(ws)

  o.on('update', () => debug('updated: %s', o.toString()))
  o.on('close', () => debug('order closed: %s', o.status))

  debug('submitting order %d', o.cid)
  await o.submit()

  debug(
    'got submit confirmation for order %d [%d] [tif: %d]',
    o.cid, o.id, o.mtsTIF
  )
  await ws.close()
}

execute()
