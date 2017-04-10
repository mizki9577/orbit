/* @flow */
import type { State } from '../types.js'

import React, { Component } from 'react'
import { Container } from 'flux/utils'

import Panel from 'react-bootstrap/es/Panel'
import Button from 'react-bootstrap/es/Button'
import ButtonGroup from 'react-bootstrap/es/ButtonGroup'
import Glyphicon from 'react-bootstrap/es/Glyphicon'

import store from '../store.js'
import * as actions from '../actions.js'

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
    const { bodies, selectedBodyId, selectedBodyIndex, followingBodyId } = this.state

    if (selectedBodyId == null || selectedBodyIndex == null) return null
    const body = bodies[selectedBodyIndex]

    return (
      <Panel className={ styles.panel }>
        <ButtonGroup>
          <Button onClick={ ev => this.handleCloseButtonClick(ev) }>
            <Glyphicon glyph="remove" />
            Close
          </Button>
        </ButtonGroup>

        <table className={ styles.table }>
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
