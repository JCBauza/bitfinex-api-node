import { RESTv1, RESTv2 } from '@jcbit/bfx-api-node-rest'
import WSv1 from 'bfx-api-node-ws1'
import WSv2 from './lib/transports/ws2.js'
import WS2Manager from './lib/ws2_manager.js'

/**
 * Generate a deterministic cache key from an object by sorting keys.
 * Prevents cache collisions from different key orderings.
 *
 * @param {object} obj - object to stringify
 * @returns {string} key
 * @private
 */
const stableStringify = (obj) => {
  if (obj === null || typeof obj !== 'object') return JSON.stringify(obj)
  if (Array.isArray(obj)) return JSON.stringify(obj.map(stableStringify))
  const keys = Object.keys(obj).sort()
  return '{' + keys.map(k => `${JSON.stringify(k)}:${stableStringify(obj[k])}`).join(',') + '}'
}

/**
 * Provides access to versions 1 & 2 of the HTTP & WebSocket Bitfinex APIs
 */
class BFX {
  /**
   * @param {object} [opts] - options
   * @param {string} [opts.apiKey] - API key
   * @param {string} [opts.apiSecret] - API secret
   * @param {string} [opts.authToken] - optional auth option
   * @param {string} [opts.company] - optional auth option
   * @param {boolean} [opts.transform] - if true, packets are converted to models
   * @param {object} [opts.ws] - ws transport options
   * @param {object} [opts.rest] - rest transport options
   */
  constructor (opts = {
    apiKey: '',
    apiSecret: '',
    authToken: '',
    company: '',
    transform: false,
    ws: {},
    rest: {}
  }) {
    if (opts.constructor.name !== 'Object') {
      throw new Error([
        'constructor takes an object since version 2.0.0, see:',
        'https://github.com/bitfinexcom/bitfinex-api-node#version-200-breaking-changes\n'
      ].join('\n'))
    }

    this._apiKey = opts.apiKey || ''
    this._apiSecret = opts.apiSecret || ''
    this._authToken = opts.authToken || ''
    this._company = opts.company || ''
    this._transform = opts.transform === true
    this._wsArgs = opts.ws || {}
    this._restArgs = opts.rest || {}
    this._transportCache = {
      rest: {},
      ws: {}
    }
  }

  /**
   * Returns an arguments map ready to pass to a transport constructor
   *
   * @param {object} extraOpts - options to pass to transport
   * @returns {object} payload
   */
  _getTransportPayload (extraOpts) {
    return {
      apiKey: this._apiKey,
      apiSecret: this._apiSecret,
      authToken: this._authToken,
      company: this._company,
      transform: this._transform,
      ...extraOpts
    }
  }

  /**
   * Returns a new REST API class instance (cached by version)
   *
   * @param {number} [version] - 1 or 2 (default)
   * @param {object} [extraOpts] - passed to transport constructor
   * @returns {RESTv1|RESTv2} transport
   */
  rest (version = 2, extraOpts = {}) {
    if (version !== 1 && version !== 2) {
      throw new Error(`invalid http API version: ${version}`)
    }

    const key = `${version}|${stableStringify(extraOpts)}`

    if (!this._transportCache.rest[key]) {
      const mergedOpts = { ...this._restArgs, ...extraOpts }
      const payload = this._getTransportPayload(mergedOpts)

      this._transportCache.rest[key] = version === 2
        ? new RESTv2(payload)
        : new RESTv1(payload)
    }

    return this._transportCache.rest[key]
  }

  /**
   * Returns a new WebSocket API class instance (cached by version)
   *
   * @param {number} [version] - 1 or 2 (default)
   * @param {object} [extraOpts] - passed to transport constructor
   * @returns {WSv1|WSv2} transport
   */
  ws (version = 2, extraOpts = {}) {
    if (version !== 1 && version !== 2) {
      throw new Error(`invalid websocket API version: ${version}`)
    }

    const key = `${version}|${stableStringify(extraOpts)}`

    if (!this._transportCache.ws[key]) {
      const mergedOpts = { ...this._wsArgs, ...extraOpts }
      const payload = this._getTransportPayload(mergedOpts)

      this._transportCache.ws[key] = version === 2
        ? new WSv2(payload)
        : new WSv1(payload)
    }

    return this._transportCache.ws[key]
  }
}

BFX.RESTv1 = RESTv1
BFX.RESTv2 = RESTv2
BFX.WSv1 = WSv1
BFX.WSv2 = WSv2
BFX.WS2Manager = WS2Manager

export default BFX
export { RESTv1, RESTv2, WSv1, WSv2, WS2Manager }
