/* @flow */

import type { State } from '../types.js'

import React, { Component } from 'react'
import { Container } from 'flux/utils'

import store from '../store.js'
import * as actions from '../actions.js'

import Navbar from 'react-bootstrap/es/Navbar'
import Button from 'react-bootstrap/es/Button'
import ButtonGroup from 'react-bootstrap/es/ButtonGroup'
import Glyphicon from 'react-bootstrap/es/Glyphicon'

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

  handleMoveModeButtonClick() {
    actions.selectMoveMode()
  }

  handleCreateModeButtonClick() {
    actions.selectCreateMode()
  }

  render() {
    const { isRunning, isFullscreen, showState, operationMode } = this.state

    return (
      <Navbar fixedBottom>
        <Navbar.Header>
          <Navbar.Brand>Orbit</Navbar.Brand>
        </Navbar.Header>
        <Navbar.Form pullLeft>

          <ButtonGroup>
            <Button active={ isRunning } onClick={ this.handleRunPauseButtonClick.bind(this) }>
              <Glyphicon glyph={ isRunning ? 'pause' : 'play' } />
            </Button>

            <Button active={ isFullscreen } onClick={ this.handleFullscreenToggleButtonClick.bind(this) }>
              <Glyphicon glyph="fullscreen" />
            </Button>

            <Button active={ showState } onClick={ this.handleShowStateToggleButtonClick.bind(this) }>
              <Glyphicon glyph="console" />
            </Button>

            <Button active={ operationMode === 'move' } onClick={ this.handleMoveModeButtonClick.bind(this) }>
              <Glyphicon glyph="move" />
            </Button>

            <Button active={ operationMode === 'create' } onClick={ this.handleCreateModeButtonClick.bind(this) }>
              <Glyphicon glyph="pencil" />
            </Button>

          </ButtonGroup>
        </Navbar.Form>
      </Navbar>
    )
  }
}

export default Container.create(ControllWindow)

// vim: set ts=2 sw=2 et:
