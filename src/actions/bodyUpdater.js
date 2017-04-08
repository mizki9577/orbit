/* @flow */
import type { Body } from '../types'
import UpdateWorker from './bodyUpdater.worker.js'

// $FlowFixMe: fuck
const worker = new UpdateWorker()

export const init = (bodies: Body[]) => {
  worker.postMessage({ type: 'init', value: bodies })
}

export const toggleRun = () => {
  worker.postMessage({ type: 'toggle_run' })
}

export const getBodies = () => (
  new Promise(resolve => {
    worker.onmessage = resolve
    worker.postMessage({ type: 'get_bodies' })
  }).then(ev => ev.data)
)

// vim: set ts=2 sw=2 et:
