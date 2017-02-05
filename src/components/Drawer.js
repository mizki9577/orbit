/* @flow */

import type { State } from '../types'

import React, { Component } from 'react'
import { Container } from 'flux/utils'

import store from '../store'
import * as actions from '../actions'

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

  handleMouseLeave() {
    actions.mouseLeft()
  }

  handleTouchStart(ev) {
    if (ev.touches.length === 1) {
      actions.mouseMoved(ev.touches[0].clientX, ev.touches[0].clientY)
      actions.mouseButtonPushed()
    } else if (ev.touches.length === 2) {
      actions.pinchStart(ev.touches)
    }
  }

  handleTouchMove(ev) {
    if (ev.touches.length === 1) {
      actions.mouseMoved(ev.touches[0].clientX, ev.touches[0].clientY)
    } else if (ev.touches.length === 2) {
      actions.pinchMove(ev.touches)
    }
  }

  handleTouchEnd() {
    actions.mouseLeft()
  }

  handleWheel(ev) {
    actions.wheelMoved(ev.deltaY)
  }

  handleBodyClicked(id) {
    actions.selectBody(id)
  }

  render() {
    const { windowWidth, windowHeight, scale, centerX, centerY, bodies } = this.state

    return (
      <svg
        style={ style } width={ windowWidth } height={ windowHeight } viewBox={ `${-windowWidth/2} ${-windowHeight/2} ${windowWidth} ${windowHeight}` }
        onMouseMove={ this.handleMouseMove.bind(this) }
        onMouseDown={ this.handleMouseDown.bind(this) }
        onMouseUp={ this.handleMouseUp.bind(this) }
        onMouseLeave={ this.handleMouseLeave.bind(this) }
        onTouchStart={ this.handleTouchStart.bind(this) }
        onTouchMove={ this.handleTouchMove.bind(this) }
        onTouchEnd={ this.handleTouchEnd.bind(this) }
        onWheel={ this.handleWheel.bind(this) }
      >
        <g transform={`scale(${scale}) translate(${-centerX} ${-centerY})`}>
        { bodies.map(b => (
          <circle key={ b.id } r={ b.radius } cx={ b.x } cy={ b.y } style={ b.style }
                  onMouseDown={ () => this.handleBodyClicked(b.id) } />
        )) }
        </g>
      </svg>
    )
  }
}

export default Container.create(Drawer)

// vim: set ts=2 sw=2 et:
