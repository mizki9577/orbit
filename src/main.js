/* @flow */
import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App.js'

navigator.serviceWorker.register('./sw.bundle.js')

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

// vim: set ts=2 sw=2 et:
