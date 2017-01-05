/* @flow */

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
    const { windowWidth, windowHeight, mouseX, mouseY, isMouseButtonPushed, zoomLevel, bodies } = this.state

    const width  = windowWidth  / zoomLevel
    const height = windowHeight / zoomLevel
    const bottom  = height / 2
    const right = width  / 2
    const top = -bottom
    const left = -right
    const svgMouseX = mouseX === null ? null : left + mouseX / zoomLevel
    const svgMouseY = mouseY === null ? null : top + mouseY / zoomLevel

    return (
      <svg style={ style } width={ windowWidth } height={ windowHeight } viewBox={ `${left} ${top} ${width} ${height}` }
           onMouseMove={ this.handleMouseMove.bind(this) } onMouseDown={ this.handleMouseDown.bind(this) } onMouseUp={ this.handleMouseUp.bind(this) } onMouseLeave={ this.handleMouseLeave.bind(this) } onWheel={ this.handleWheel.bind(this) }>
        {
          bodies.map(b => <circle key={ b.id } r={ b.radius } cx={ b.x } cy={ b.y } style={ b.style } />)
        }
        { svgMouseX === null || svgMouseY === null ? null : (
          <g stroke={ isMouseButtonPushed ? 'red' : 'black' } strokeWidth={ 1 / zoomLevel }>
            <line x1={ left } y1={ svgMouseY } x2={ right } y2={ svgMouseY } />
            <line x1={ svgMouseX } y1={ top } x2={ svgMouseX } y2={ bottom } />
          </g>
        ) }
      </svg>
    )
  }
}

export default Container.create(Drawer)

// vim: set ts=2 sw=2 et:
