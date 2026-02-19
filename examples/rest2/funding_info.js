import _bfxUtil from 'bfx-api-node-util'
import argFromCLI from '../util/arg_from_cli.js'
import { RESTv2 } from '../../index.js'
import { args, debug, debugTable } from '../util/setup.js'

const { prepareAmount } = _bfxUtil
const { apiKey, apiSecret } = args

async function execute () {
  const rest = new RESTv2({
    apiKey,
    apiSecret,
    transform: true
  })
  const symbol = argFromCLI(0, 'fUSD')

  debug('fetching funding info for %s', symbol)

  const flu = await rest.fundingInfo(symbol)
  const [,, [yieldLoan, yieldLend, durationLoan, durationLend]] = flu

  debugTable({
    headers: [
      'Symbol', 'Yield Loan', 'Yield Lend', 'Duration Loan', 'Duration Lend'
    ],
    rows: [[
      symbol, prepareAmount(yieldLoan), prepareAmount(yieldLend), durationLoan,
      durationLend
    ]]
  })
}

execute()
