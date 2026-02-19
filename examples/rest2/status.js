import { RESTv2 } from '../../index.js'
import { debug } from '../util/setup.js'

async function execute () {
  const rest = new RESTv2()
  debug('fetching platform status...')

  const status = await rest.status()

  debug(status === 0
    ? 'Platform currently under maintenance'
    : 'Platform operating normally'
  )
}

execute()
