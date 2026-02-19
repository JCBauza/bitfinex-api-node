import { RESTv2 } from '../../index.js'
import { args, debug, debugTable } from '../util/setup.js'

const { apiKey, apiSecret } = args

async function execute () {
  const rest = new RESTv2({
    apiKey,
    apiSecret,
    transform: true
  })
  debug('fetching permissions')

  const perms = await rest.keyPermissions()

  const rows = perms.map(({ key, read, write }) => [
    key.toUpperCase(), read ? 'Y' : 'N', write ? 'Y' : 'N'
  ])

  debugTable({
    rows,
    headers: ['Scope', 'Read', 'Write']
  })
}

execute()
