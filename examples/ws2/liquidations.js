import _bfxModels from 'bfx-api-node-models'
import { args, debug } from '../util/setup.js'
import WSv2 from '../../lib/transports/ws2.js'

const { Liquidations } = _bfxModels
const { apiKey, apiSecret } = args

async function execute () {
  const ws = new WSv2({
    apiKey,
    apiSecret
  })
  ws.on('error', e => debug('WSv2 error: %s', e.message | e))
  await ws.open()

  ws.onStatus({ key: 'liq:global' }, (data) => {
    data.forEach(liq => (
      debug('liquidation: %s', new Liquidations(liq).toString())
    ))
  })

  await ws.subscribeStatus('liq:global')
}

execute()
