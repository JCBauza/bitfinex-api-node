import { RESTv2 } from '../../index.js'
import { debug } from '../util/setup.js'

async function execute () {
  const rest = new RESTv2({
    transform: true
  })
  debug('fetching symbol list...')

  const symbols = await rest.symbols()

  debug('read %d symbols', symbols.length)
  debug('%s', symbols.map(s => `t${s.toUpperCase()}`).join(', '))
}

execute()
