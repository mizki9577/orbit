/* @flow */

import type { State } from '../types'

import React, { Component } from 'react'
import { Container } from 'flux/utils'

import store from '../store'
import * as actions from '../actions'

import Drawer from './Drawer'
import Controlls from './Controlls'
import ObjectTable from './ObjectTable'

class App extends Component {
  state: State

  static getStores() {
    return [store]
  }

  static calculateState() {
    return store.getState()
  }

  componentDidMount() {
    actions.applicationStarted()
  }

  render() {
    return (
      <div>
        <ObjectTable obj={ this.state } exclude={{ bodies: null }} show={ this.state.showState } />
        <Drawer />
        <Controlls />
      </div>
    )
  }
}

export default Container.create(App)

// vim: set ts=2 sw=2 et:
