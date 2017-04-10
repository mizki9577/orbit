/* @flow */
import type { State } from '../types.js'

import React, { Component } from 'react'
import { Container } from 'flux/utils'

import store from '../store.js'
import * as actions from '../actions.js'

class Toolbar extends Component {
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

  handleMoveModeButtonClick() {
    actions.selectMoveMode()
  }

  handleCreateModeButtonClick() {
    actions.selectCreateMode()
  }

  render() {
    const { isRunning, isFullscreen, showState, operationMode } = this.state

    return (
      <ButtonToolbar style={{ position: 'absolute', bottom: 0 }}>
        <ButtonGroup>
          <Button onClick={ () => this.handleRunPauseButtonClick() }>
            <Glyphicon glyph={ isRunning ? 'pause' : 'play' } />
          </Button>

          <Button active={ isFullscreen } onClick={ () => this.handleFullscreenToggleButtonClick() }>
            <Glyphicon glyph="fullscreen" />
          </Button>

          <Button active={ showState } onClick={ () => this.handleShowStateToggleButtonClick() }>
            <Glyphicon glyph="console" />
          </Button>
        </ButtonGroup>

        <ButtonGroup>
          <Button active={ operationMode === 'move' } onClick={ () => this.handleMoveModeButtonClick() }>
            <Glyphicon glyph="move" />
          </Button>

          <Button active={ operationMode === 'create' } onClick={ () => this.handleCreateModeButtonClick() }>
            <Glyphicon glyph="pencil" />
          </Button>
        </ButtonGroup>
      </ButtonToolbar>
    )
  }
}

export default Container.create(Toolbar)

// vim: set ts=2 sw=2 et:
