/* @flow */

import type { State } from '../types'

import React, { Component } from 'react'
import { Container } from 'flux/utils'

import store from '../store'
import * as actions from '../actions'

import * as style from './ControllWindow.css.js'

class ControllWindow extends Component {
  state: State

  static getStores() {
    return [store]
  }

  static calculateState() {
    return store.getState()
  }

  handleFullscreenToggleButtonClick() {
    actions.toggleFullscreen()
  }

  handleRunPauseButtonClick() {
    actions.toggleRunPause()
  }

  handleShowStateToggleButtonClick() {
    actions.toggleShowState()
  }

  render() {
    const { isRunning, isFullscreen, showState } = this.state

    return (
      <div style={ style.div }>
        <button style={ style.button } onClick={ this.handleRunPauseButtonClick.bind(this) }>
          { isRunning ? 'Pause' : 'Run' }
        </button>
        <button style={ style.button } onClick={ this.handleFullscreenToggleButtonClick.bind(this) }>
          { isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen' }
        </button>
        <button style={ style.button } onClick={ this.handleShowStateToggleButtonClick.bind(this) }>
          { showState ? 'Hide State' : 'Show State' }
        </button>
      </div>
    )
  }
}

export default Container.create(ControllWindow)

// vim: set ts=2 sw=2 et:
