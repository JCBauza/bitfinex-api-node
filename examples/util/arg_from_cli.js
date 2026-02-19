import _isEmpty from 'lodash/isEmpty.js'
import _isFunction from 'lodash/isFunction.js'

/**
 * Grabs an argument from the arguments list if we've been executed via node or
 * npm
 *
 * @param {number} index - starting after invocation (2)
 * @param {string} def - fallback value if none found/not supported
 * @param {Function?} parser - optional, used to process value if provided
 * @returns {string} value
 */
const argFromCli = (index, def, parser) => {
  const val = /node/.test(process.argv[0]) || /npm/.test(process.argv[0])
    ? _isEmpty(process.argv[2 + index]) ? def : process.argv[2 + index]
    : def

  return _isFunction(parser)
    ? parser(val)
    : val
}

export default argFromCli
