import _bfxUtil from 'bfx-api-node-util'
import _isEmpty from 'lodash/isEmpty.js'
import { RESTv2 } from '../../index.js'
import { args, debug, debugTable } from '../util/setup.js'

const { prepareAmount, preparePrice } = _bfxUtil
const { apiKey, apiSecret } = args

const START = Date.now() - (30 * 24 * 60 * 60 * 1000 * 1000)
const END = Date.now()
const LIMIT = 25

async function execute () {
  const rest = new RESTv2({
    apiKey,
    apiSecret,
    transform: true
  })
  const symbol = 'tBTCUSD'

  if (_isEmpty(symbol)) {
    return debug('symbol required')
  }

  debug('fetching 30d trade history for %s...', symbol)

  const trades = await rest.accountTrades(symbol, START, END, LIMIT)

  if (trades.length === 0) {
    return debug('no historical trades for %s', symbol)
  }

  debugTable({
    headers: [
      'Trade ID', 'Order ID', 'Created', 'Exec Amount', 'Exec Price', 'Fee'
    ],

    rows: trades.map(t => [
      t.id, t.orderID, new Date(t.mtsCreate).toLocaleString(),
      prepareAmount(t.execAmount), preparePrice(t.execPrice),
      `${t.fee} ${t.feeCurrency}`
    ])
  })
}

execute()
