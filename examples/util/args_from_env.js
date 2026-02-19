import _isString from 'lodash/isString.js'
import _isEmpty from 'lodash/isEmpty.js'
import { SocksProxyAgent } from 'socks-proxy-agent'

const validArg = v => _isString(v) && !_isEmpty(v)

/**
 * Grabs RESTv2/WSv2 constructor arguments from the environment, configuring
 * the api credentials, connection agent, and connection URL
 *
 * @param {string?} urlKey - name of env var holding the connection URL
 * @returns {object} envArgs
 */
const argsFromEnv = (urlKey) => {
  const { API_KEY, API_SECRET, SOCKS_PROXY_URL } = process.env
  const URL = process.env[urlKey]
  const proxyAgent = validArg(SOCKS_PROXY_URL) && new SocksProxyAgent(SOCKS_PROXY_URL)
  const envArgs = {}

  if (proxyAgent) {
    envArgs.agent = proxyAgent // WebSocket proxy (ws2.js)
    envArgs.fetch = (url, init = {}) => fetch(url, { ...init, dispatcher: proxyAgent }) // REST v8 proxy
  }
  if (validArg(URL)) envArgs.url = URL
  if (validArg(API_KEY)) envArgs.apiKey = API_KEY
  if (validArg(API_SECRET)) envArgs.apiSecret = API_SECRET

  return envArgs
}

export default argsFromEnv
