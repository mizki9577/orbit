/* @flow */

import type { State } from '../types.js'

import React, { Component } from 'react'
import { Container } from 'flux/utils'

import store from '../store.js'
import * as actions from '../actions.js'

import Panel from 'react-bootstrap/es/Panel'
import Table from 'react-bootstrap/es/Table'
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
      <Panel>
        <Button block onClick={ this.handleCloseButtonClick.bind(this) }>
          <Glyphicon glyph="remove" />
          Close
        </Button>

        <Table>
          <tbody>

            <tr>
              <th>Mass</th>
              <td>
                <input type="number" value={ body.mass } readOnly />
              </td>
            </tr>

            <tr>
              <th>Radius</th>
              <td>
                <input type="number" value={ body.radius } readOnly />
              </td>
            </tr>

            <tr>
              <th>X Coor.</th>
              <td>
                <input type="number" value={ body.x.toPrecision(4) } readOnly />
              </td>
            </tr>

            <tr>
              <th>Y Coor.</th>
              <td>
                <input type="number" value={ body.y.toPrecision(4) } readOnly />
              </td>
            </tr>

            <tr>
              <th>X Vel.</th>
              <td>
                <input type="number" value={ body.vx.toPrecision(4) } readOnly />
              </td>
            </tr>

            <tr>
              <th>Y Vel.</th>
              <td>
                <input type="number" value={ body.vy.toPrecision(4) } readOnly />
              </td>
            </tr>

            <tr>
              <th>Speed</th>
              <td>
                <input type="number" value={ Math.hypot(body.vx, body.vy).toPrecision(4) } readOnly />
              </td>
            </tr>

          </tbody>
        </Table>

        <ButtonGroup>
          <Button block active={ followingBodyId === selectedBodyId } onClick={ this.handleFollowToggleButtonClick.bind(this, selectedBodyId) }>
            <Glyphicon glyph="eye-open" />
            Follow
          </Button>
          <Button block bsStyle="danger" onClick={ this.handleDeleteButtonClick.bind(this, selectedBodyId) }>
            <Glyphicon glyph="erase" />
            Remove
          </Button>
        </ButtonGroup>

      </Panel>
    )
  }
}

export default Container.create(BodyInformationWindow)

// vim: set ts=2 sw=2 et:
