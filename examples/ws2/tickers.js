import { debug } from '../util/setup.js'
import WSv2 from '../../lib/transports/ws2.js'

async function execute () {
  const ws = new WSv2({
    transform: true
  })
  ws.on('error', e => debug('WSv2 error: %s', e.message | e))
  await ws.open()

  ws.onTicker({ symbol: 'tETHUSD' }, (ticker) => {
    debug('ETH/USD ticker: %j', ticker.toJS())
  })

  ws.onTicker({ symbol: 'fUSD' }, (ticker) => {
    debug('fUSD ticker: %j', ticker.toJS())
  })

  await ws.subscribeTicker('tETHUSD')
  await ws.subscribeTicker('fUSD')
  await ws.close()
}

execute()
