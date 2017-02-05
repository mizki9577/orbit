/* @flow */

import type { State } from '../types.js'

import React, { Component } from 'react'
import { Container } from 'flux/utils'

import store from '../store.js'
import * as actions from '../actions.js'

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

    return (
      <div style={ style.container }>
        <table style={ style.table }>
          <tbody>

            <tr>
              <th style={ style.th }>Mass</th>
              <td style={ style.td }>
                <input style={ style.input } type="number" value={ body.mass } readOnly />
              </td>
            </tr>

            <tr>
              <th style={ style.th }>Radius</th>
              <td style={ style.td }>
                <input style={ style.input } type="number" value={ body.radius } readOnly />
              </td>
            </tr>

            <tr>
              <th style={ style.th }>X Coor.</th>
              <td style={ style.td }>
                <input style={ style.input } type="number" value={ body.x.toPrecision(4) } readOnly />
              </td>
            </tr>

            <tr>
              <th style={ style.th }>Y Coor.</th>
              <td style={ style.td }>
                <input style={ style.input } type="number" value={ body.y.toPrecision(4) } readOnly />
              </td>
            </tr>

            <tr>
              <th style={ style.th }>X Vel.</th>
              <td style={ style.td }>
                <input style={ style.input } type="number" value={ body.vx.toPrecision(4) } readOnly />
              </td>
            </tr>

            <tr>
              <th style={ style.th }>Y Vel.</th>
              <td style={ style.td }>
                <input style={ style.input } type="number" value={ body.vy.toPrecision(4) } readOnly />
              </td>
            </tr>

            <tr>
              <th style={ style.th }>Speed</th>
              <td style={ style.td }>
                <input style={ style.input } type="number" value={ Math.hypot(body.vx, body.vy).toPrecision(4) } readOnly />
              </td>
            </tr>

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
