import dotenv from 'dotenv'
import ReadlinePromise from 'readline-promise'
import argsFromEnv from './args_from_env.js'
import debugTableUtil from './debug_table.js'
import { get } from './debug.js'

const Readline = ReadlinePromise.default || ReadlinePromise
const D = get()
const debug = D('>')
debug.enabled = true

dotenv.config()

/**
 * Log a table to the console
 *
 * @param {object} args - arguments
 * @param {object[]} args.rows - data, can be specified as 2nd param
 * @param {string[]} args.headers - column labels
 * @param {number[]} args.widths - column widths
 * @param {object[]} extraRows - optional row spec as 2nd param
 */
const debugTable = ({ rows = [], headers, widths }, extraRows = []) => {
  debug('')
  debugTableUtil({
    rows: [...rows, ...extraRows],
    headers,
    widths,
    debug
  })
  debug('')
}

export const args = argsFromEnv()
export { debug, debugTable }
export const readline = Readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
})
