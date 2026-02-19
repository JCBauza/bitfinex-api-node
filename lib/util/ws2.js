import _findLast from 'lodash/findLast.js'

/**
 * Resolves the message payload; useful for getting around sequence numbers
 *
 * @param {Array} msg - message to parse
 * @returns {Array} payload - undefined if not found
 */
const getMessagePayload = (msg = []) => {
  return _findLast(msg, i => Array.isArray(i))
}

export default getMessagePayload
