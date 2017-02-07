/* @flow */

import type { State } from '../types.js'

import React, { Component } from 'react'
import { Container } from 'flux/utils'

import store from '../store.js'
import * as actions from '../actions.js'

import Button from 'react-bootstrap/es/Button'
import ButtonGroup from 'react-bootstrap/es/ButtonGroup'
import ButtonToolbar from 'react-bootstrap/es/ButtonToolbar'
import Glyphicon from 'react-bootstrap/es/Glyphicon'

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
          <Button onClick={ this.handleRunPauseButtonClick.bind(this) }>
            <Glyphicon glyph={ isRunning ? 'pause' : 'play' } />
          </Button>

          <Button active={ isFullscreen } onClick={ this.handleFullscreenToggleButtonClick.bind(this) }>
            <Glyphicon glyph="fullscreen" />
          </Button>

          <Button active={ showState } onClick={ this.handleShowStateToggleButtonClick.bind(this) }>
            <Glyphicon glyph="console" />
          </Button>
        </ButtonGroup>

        <ButtonGroup>
          <Button active={ operationMode === 'move' } onClick={ this.handleMoveModeButtonClick.bind(this) }>
            <Glyphicon glyph="move" />
          </Button>

          <Button active={ operationMode === 'create' } onClick={ this.handleCreateModeButtonClick.bind(this) }>
            <Glyphicon glyph="pencil" />
          </Button>
        </ButtonGroup>
      </ButtonToolbar>
    )
  }
}

export default Container.create(Toolbar)

// vim: set ts=2 sw=2 et:
