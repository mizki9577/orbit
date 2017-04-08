/* @flow */
import type { Body } from '../types'
import UpdateWorker from './bodyUpdater.worker.js'

const worker = new UpdateWorker()

export default (bodies: Body[]) => new Promise(resolve => {
  worker.onmessage = resolve
  worker.postMessage(bodies)
}).then(ev => ev.data)

// vim: set ts=2 sw=2 et:
