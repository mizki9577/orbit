/* @flow */

import type { State } from './types'

import React, { Component } from 'react'
import { Container } from 'flux/utils'

import store from './store'

import * as style from './BodyInformationWindow.css.js'

class BodyInformationWindow extends Component {
  state: State

  static getStores() {
    return [store]
  }

  static calculateState() {
    return store.getState()
  }

  render() {
    const { bodies, selectedBody, scale } = this.state

    if (selectedBody === null) return null

    const body = bodies[selectedBody]
    const entries = [
      ['Mass'      , 'number', body.mass],
      ['Radius'    , 'number', body.radius],
      ['X'         , 'number', body.x.toFixed(4)],
      ['Y'         , 'number', body.y.toFixed(4)],
      ['Velocity X', 'number', body.vx.toFixed(4)],
      ['Velocity Y', 'number', body.vy.toFixed(4)],
    ]

    return (
      <table style={ style.table }>
        <tbody>
          { entries.map(([k, t, v]) => (
            <tr key={ 'biw' + k }>
              <th style={ style.th }>{ k }</th>
              <td style={ style.td }>
                <input style={ style.input } type={ t } value={ v } readonly />
              </td>
            </tr>
          )) }
        </tbody>
      </table>
    )
  }
}

export default Container.create(BodyInformationWindow)

// vim: set ts=2 sw=2 et:
