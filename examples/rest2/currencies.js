import _chunk from 'lodash/chunk.js'
import { RESTv2 } from '../../index.js'
import { debug } from '../util/setup.js'

async function execute () {
  const rest = new RESTv2()
  debug('fetching currency list...')

  const currencies = await rest.currencies()

  debug('received %d currencies', currencies[0].length)

  debug('')
  _chunk(currencies[0], 10).forEach((currencyChunk) => {
    debug('%s', currencyChunk.join(', '))
  })
  debug('')
}

execute()
