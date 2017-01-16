/* @flow */

import type { State } from './types'

import React, { Component } from 'react'
import { Container } from 'flux/utils'
import screenfull from 'screenfull'

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

  componentDidMount() {
    document.querySelector('svg').addEventListener('touchend', () => {
      screenfull.request()
    }, { once: true })
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

  handleTouchStart(ev) {
    actions.touchStarted(extractTouches(ev.touches))
  }

  handleTouchMove(ev) {
    actions.touchMoved(extractTouches(ev.touches))
  }

  handleTouchEnd(ev) {
    actions.touchEnded(extractTouches(ev.touches))
  }

  handleWheel(ev) {
    actions.wheelMoved(ev.deltaY)
  }

  handleBodyClicked(ev, id) {
    ev.stopPropagation()
    actions.bodyClicked(id)
  }

  render() {
    const { windowWidth, windowHeight, scale, centerX, centerY, selectedBody, bodies } = this.state

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
                  onMouseDown={ ev => this.handleBodyClicked(ev, b.id) } />
        )) }
        </g>
      </svg>
    )
  }
}

const extractTouches = touches => Array.from(touches).map(t => ({
  id: t.identifier,
  x: t.clientX,
  y: t.clientY,
}))

export default Container.create(Drawer)

// vim: set ts=2 sw=2 et:
