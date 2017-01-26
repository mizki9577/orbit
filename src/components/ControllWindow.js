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
    actions.fullscreenToggleButtonClicked()
  }

  handleRunPauseButtonClick() {
    actions.toggleRunPause()
  }

  render() {
    const { isRunning, isFullscreen } = this.state

    return (
      <div style={ style.div }>
        <button onClick={ this.handleRunPauseButtonClick.bind(this) }>
          { isRunning ? 'Pause' : 'Run' }
        </button>
        <button onClick={ this.handleFullscreenToggleButtonClick.bind(this) }>
          { isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen' }
        </button>
      </div>
    )
  }
}

export default Container.create(ControllWindow)

// vim: set ts=2 sw=2 et:
