/* @flow */

import React, { Component } from 'react'
import { Container } from 'flux/utils'

import store from './store'
import * as actions from './actions'

import Drawer from './Drawer'

class App extends Component {
  static getStores() {
    return [store]
  }

  static calculateState() { }

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
    return <Drawer />
  }
}

export default Container.create(App)

// vim: set ts=2 sw=2 et:
