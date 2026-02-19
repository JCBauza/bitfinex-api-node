/* eslint-env mocha */

import assert from 'node:assert'
import debugTable from '../../examples/util/debug_table.js'

describe('debugTable', () => {
  it('throws an error if row, header, and column counts don\'t match', () => {
    try {
      debugTable({
        rows: [[1]],
        headers: ['', ''],
        widths: [20, 20, 20],
        debug: () => {}
      })
      assert.fail('no error was thrown')
    } catch (e) {
      assert.ok(true)
    }
  })

  it('prints the table out line by line, and returns it as a multi-line string', () => {
    let debugLineCount = 0

    const str = debugTable({
      rows: [[1, 1, 1], [2, 2, 2], [3, 3, 3]],
      headers: ['', '', ''],
      widths: [20, 20, 20],
      debug: () => debugLineCount++
    })

    assert.strictEqual(str.split('\n').length, debugLineCount)
  })
})
