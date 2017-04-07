/* @flow */
import UpdateWorker from 'worker-loader!./worker.js'

const worker = new UpdateWorker()

export default bodies => new Promise(resolve => {
  worker.onmessage = resolve
  worker.postMessage(bodies)
}).then(ev => ev.data)

// vim: set ts=2 sw=2 et:
