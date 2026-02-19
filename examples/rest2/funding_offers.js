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

  debug('fetching funding offers for %s', symbol)

  const fos = await rest.fundingOffers(symbol)

  if (fos.length === 0) {
    debug('none available')
  } else {
    debugTable({
      headers: ['Symbol', 'Amount', 'Status', 'Rate', 'Period', 'Renew'],
      rows: fos.map(fo => [
        fo.symbol, prepareAmount(fo.amount), fo.status, fo.rate * 100,
        fo.period, fo.renew ? 'Y' : 'N'
      ])
    })
  }
}

execute()
