/* @flow */

import type { State } from '../types.js'

import React, { Component } from 'react'
import { Container } from 'flux/utils'

import store from '../store.js'
import * as actions from '../actions.js'

import Panel from 'react-bootstrap/es/Panel'
import Button from 'react-bootstrap/es/Button'
import ButtonGroup from 'react-bootstrap/es/ButtonGroup'
import Glyphicon from 'react-bootstrap/es/Glyphicon'

class BodyInformationWindow extends Component {
  state: State

  static getStores() {
    return [store]
  }

  static calculateState() {
    return store.getState()
  }

  handleDeleteButtonClick(id: number) {
    actions.deleteBody(id)
  }

  handleCloseButtonClick() {
    actions.closeInformationWindow()
  }

  handleFollowToggleButtonClick(id: number) {
    if (this.state.followingBodyId === id) {
      actions.stopFollowing()
    } else {
      actions.selectFollowTarget(id)
    }
  }

  render() {
    const { bodies, selectedBodyId, followingBodyId } = this.state

    if (selectedBodyId == null) return null
    const body = bodies.find(b => b.id === selectedBodyId)
    if (body == null) return null

    return (
      <Panel style={{ maxWidth: '2.5in' }}>
        <ButtonGroup>
          <Button onClick={ this.handleCloseButtonClick.bind(this) }>
            <Glyphicon glyph="remove" />
            Close
          </Button>
        </ButtonGroup>

        <table style={{ width: '100%', textAlign: 'right' }}>
          <tbody>
            <tr><th>Mass         </th><td> { body.mass                                   } </td></tr>
            <tr><th>Radius       </th><td> { body.radius                                 } </td></tr>
            <tr><th>x            </th><td> { body.x.toPrecision(4)                       } </td></tr>
            <tr><th>y            </th><td> { body.y.toPrecision(4)                       } </td></tr>
            <tr><th>v<sub>x</sub></th><td> { body.vx.toPrecision(4)                      } </td></tr>
            <tr><th>v<sub>y</sub></th><td> { body.vy.toPrecision(4)                      } </td></tr>
            <tr><th>v            </th><td> { Math.hypot(body.vx, body.vy).toPrecision(4) } </td></tr>
          </tbody>
        </table>

        <ButtonGroup justified>
          <ButtonGroup>
            <Button active={ followingBodyId === selectedBodyId } onClick={ this.handleFollowToggleButtonClick.bind(this, selectedBodyId) }>
              <Glyphicon glyph="eye-open" />
              Follow
            </Button>
          </ButtonGroup>

          <ButtonGroup>
            <Button bsStyle="danger" onClick={ this.handleDeleteButtonClick.bind(this, selectedBodyId) }>
              <Glyphicon glyph="erase" />
              Remove
            </Button>
          </ButtonGroup>
        </ButtonGroup>
      </Panel>
    )
  }
}

export default Container.create(BodyInformationWindow)

// vim: set ts=2 sw=2 et:
