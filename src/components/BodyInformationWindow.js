/* @flow */

import type { State } from '../types'

import React, { Component } from 'react'
import { Container } from 'flux/utils'

import store from '../store'
import * as actions from '../actions'

import * as style from './BodyInformationWindow.css.js'

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

  handleFollowCheckboxChange(id: number, ev) {
    if (ev.target.checked) {
      actions.selectFollowTarget(id)
    } else {
      actions.stopFollowing()
    }
  }

  render() {
    const { bodies, selectedBodyId, followingBodyId } = this.state

    if (selectedBodyId == null) return null
    const body = bodies.find(b => b.id === selectedBodyId)
    if (body == null) return null

    const entries = [
      ['Mass'      , 'number', body.mass],
      ['Radius'    , 'number', body.radius],
      ['X'         , 'number', body.x.toPrecision(4)],
      ['Y'         , 'number', body.y.toPrecision(4)],
      ['Velocity X', 'number', body.vx.toPrecision(4)],
      ['Velocity Y', 'number', body.vy.toPrecision(4)],
      ['Speed'     , 'number', Math.hypot(body.vx, body.vy).toPrecision(4)],
    ]

    return (
      <div style={ style.container }>
        <table style={ style.table }>
          <tbody>
            { entries.map(([k, t, v]) => (
              <tr key={ 'biw' + k }>
                <th style={ style.th }>{ k }</th>
                <td style={ style.td }>
                  <input style={ style.input } type={ t } value={ v } readOnly />
                </td>
              </tr>
            )) }
          </tbody>
        </table>
        <div style={ style.right }>
          <label>
            <input type="checkbox" checked={ followingBodyId === selectedBodyId } onChange={ this.handleFollowCheckboxChange.bind(this, selectedBodyId) } />
            Follow
          </label>
          <button style={ style.button } onClick={ this.handleDeleteButtonClick.bind(this, selectedBodyId) }>Delete</button>
          <button style={ style.button } onClick={ this.handleCloseButtonClick.bind(this) }>Close</button>
        </div>
      </div>
    )
  }
}

export default Container.create(BodyInformationWindow)

// vim: set ts=2 sw=2 et:
