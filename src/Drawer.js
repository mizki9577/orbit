/* @flow */

import type { State } from './types'

import React, { Component } from 'react'
import { Container } from 'flux/utils'

import store from './store'
import * as actions from './actions'

import style from './Drawer.css.js'

class Drawer extends Component {
  state: State

  static getStores() {
    return [store]
  }

  static calculateState() {
    return store.getState()
  }

  handleMouseMove(ev) {
    actions.mouseMoved(ev.clientX, ev.clientY)
  }

  handleMouseDown(ev) {
    actions.mouseMoved(ev.clientX, ev.clientY)
    actions.mouseButtonPushed()
  }

  handleMouseUp(ev) {
    actions.mouseMoved(ev.clientX, ev.clientY)
    actions.mouseButtonReleased()
  }

  handleMouseLeave(ev) {
    actions.mouseLeft()
  }

  handleWheel(ev) {
    actions.wheelMoved(ev.deltaY)
  }

  render() {
    const { windowWidth, windowHeight, zoomLevel, centerX, centerY, bodies } = this.state

    return (
      <svg style={ style } width={ windowWidth } height={ windowHeight } viewBox={ `${-windowWidth/2} ${-windowHeight/2} ${windowWidth} ${windowHeight}` }
           onMouseMove={ this.handleMouseMove.bind(this) } onMouseDown={ this.handleMouseDown.bind(this) } onMouseUp={ this.handleMouseUp.bind(this) } onMouseLeave={ this.handleMouseLeave.bind(this) } onWheel={ this.handleWheel.bind(this) }>
        <g transform={`scale(${zoomLevel}) translate(${centerX} ${centerY})`}>
          {
            bodies.map(b => <circle key={ b.id } r={ b.radius } cx={ b.x } cy={ b.y } style={ b.style } />)
          }
        </g>
      </svg>
    )
  }
}

export default Container.create(Drawer)

// vim: set ts=2 sw=2 et:
