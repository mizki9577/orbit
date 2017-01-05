/* @flow */

import type { Body, State } from './types'

import React, { Component } from 'react'
import { Container } from 'flux/utils'

import store from './store'
import * as actions from './actions'

import style from './App.css.js'

class App extends Component {
  state: State

  static getStores() {
    return [ store ]
  }

  static calculateState(prevState) {
    return store.getState()
  }

  componentWillMount() {
    this.handleResize()
    window.addEventListener('resize', this.handleResize.bind(this))
  }

  componentDidMount() {
    window.requestAnimationFrame(this.handleFrame.bind(this))
  }

  handleResize() {
    actions.windowResized(window.innerWidth, window.innerHeight)
  }

  handleFrame() {
    actions.update()
    window.requestAnimationFrame(this.handleFrame.bind(this))
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
    const left = -width  / 2
    const top  = -height / 2
    const svgMouseX = mouseX === null ? null : mouseX / zoomLevel
    const svgMouseY = mouseY === null ? null : mouseY / zoomLevel

    return (
      <svg style={ style } width={ windowWidth } height={ windowHeight } viewBox={  `${left} ${top} ${width} ${height}` }
           onMouseMove={ this.handleMouseMove.bind(this) } onMouseDown={ this.handleMouseDown.bind(this) } onMouseUp={ this.handleMouseUp.bind(this) } onMouseLeave={ this.handleMouseLeave.bind(this) } onWheel={ this.handleWheel.bind(this) }>
        {
          bodies.map(b => <circle key={ b.id } r={ b.radius } cx={ b.x } cy={ b.y } style={ b.style } />)
        }
        { svgMouseX === null || svgMouseY === null ? null : (
          <g stroke={ isMouseButtonPushed ? 'red' : 'black' } strokeWidth={ 1 / zoomLevel }>
            <line x1={ -width / 2 } y1={ svgMouseY - height / 2 } x2={ width / 2 } y2={ svgMouseY - height / 2 } />
            <line x1={ svgMouseX - width / 2 } y1={ -height / 2 } x2={ svgMouseX - width / 2 } y2={ height / 2 } />
          </g>
        ) }
      </svg>
    )
  }
}

export default Container.create(App)

// vim: set ts=2 sw=2 et:
