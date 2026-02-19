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

  debug('fetching funding credits for %s', symbol)

  const fcs = await rest.fundingCredits(symbol)

  if (fcs.length === 0) {
    debug('none available')
  } else {
    debugTable({
      headers: ['Symbol', 'Amount', 'Status', 'Rate', 'Period', 'Renew'],
      rows: fcs.map(fc => [
        fc.symbol, prepareAmount(fc.amount), fc.status, fc.rate * 100,
        fc.period, fc.renew ? 'Y' : 'N'
      ])
    })
  }
}

execute()
