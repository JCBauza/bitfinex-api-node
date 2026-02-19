/* eslint-env mocha */

import assert from 'node:assert'
import _isObject from 'lodash/isObject.js'
import _isFunction from 'lodash/isFunction.js'

import { args, debug, debugTable, readline } from '../../examples/util/setup.js'

describe('setup', () => {
  it('provides a debugger', () => {
    assert.ok(_isObject(args), 'setup doesnt provide a tooling object')
    assert.ok(_isFunction(debug), 'setup doesnt provide a debug() instance')
    assert.ok(_isFunction(debugTable), 'setup doesnt provide a debugTable() instance')
  })

  it('provides a readline instance', () => {
    assert.ok(_isFunction(readline.questionAsync), 'no readline instance provided')
  })
}).timeout(10 * 1000) // timeout for travis
