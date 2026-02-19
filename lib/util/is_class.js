import _isFunction from 'lodash/isFunction.js'

const isClass = (f) => {
  return (
    (_isFunction(f)) &&
    (/^class\s/.test(Function.prototype.toString.call(f)))
  )
}

export default isClass
