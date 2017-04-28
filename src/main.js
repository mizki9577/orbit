/* @flow */
import 'react-mdl/extra/material.min.css'
import 'react-mdl/extra/material.min.js'

import '../manifest.json'
import '../icon.png'

import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App.js'

if (typeof navigator.serviceWorker !== 'undefined') {
  navigator.serviceWorker.register('./sw.bundle.js')
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

// vim: set ts=2 sw=2 et:
