/* @flow */

import type { State } from './types'

import React, { Component } from 'react'
import { Container } from 'flux/utils'

import store from './store'
import * as actions from './actions'

import Drawer from './Drawer'
import BodyInformationWindow from './BodyInformationWindow'
import ObjectTable from './ObjectTable'

class App extends Component {
  state: State

  static getStores() {
    return [store]
  }

  static calculateState() {
    return store.getState()
  }

  componentWillMount() {
    this.handleResize()
    window.addEventListener('resize', this.handleResize.bind(this))
  }

  componentDidMount() {
    window.requestAnimationFrame(this.handleFrame.bind(this))
  }

  handleResize() {
    actions.windowResized(window.innerWidth, window.innerHeight)
  }

  handleFrame() {
    actions.update()
    window.requestAnimationFrame(this.handleFrame.bind(this))
  }

  render() {
    return (
      <div>
        { process.env.NODE_ENV === 'production' ? null : <ObjectTable obj={ this.state } exclude={{ bodies: null }} /> }
        <BodyInformationWindow />
        <Drawer />
      </div>
    )
  }
}

export default Container.create(App)

// vim: set ts=2 sw=2 et:
