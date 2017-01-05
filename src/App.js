/* @flow */

import type { Body, State } from './types'

import React, { Component } from 'react'
import { Container } from 'flux/utils'

import store from './store'
import { update, mouseMoved, mouseButtonPushed, mouseButtonReleased, windowResized } from './actions'

class App extends Component {
  state: State

  static style = {
    position: 'absolute',
    top: 0,
    left: 0,
  }

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
    windowResized(window.innerWidth, window.innerHeight)
  }

  handleFrame() {
    update()
    window.requestAnimationFrame(this.handleFrame.bind(this))
  }

  handleMouseMove(ev) {
    mouseMoved(ev.clientX, ev.clientY)
  }

  handleMouseDown(ev) {
    mouseMoved(ev.clientX, ev.clientY)
    mouseButtonPushed()
  }

  handleMouseUp(ev) {
    mouseMoved(ev.clientX, ev.clientY)
    mouseButtonReleased()
  }

  render() {
    const { windowWidth, windowHeight, mouseX, mouseY, isMouseButtonPushed, bodies } = this.state
    return (
      <svg style={ App.style } width={ windowWidth } height={ windowHeight } viewBox={`${-windowWidth / 2} ${-windowHeight / 2} ${windowWidth} ${windowHeight}`}
           onMouseMove={ this.handleMouseMove.bind(this) } onMouseDown={ this.handleMouseDown.bind(this) } onMouseUp={ this.handleMouseUp.bind(this) }>
        {
          bodies.map(b => <circle key={ b.id } r={ b.radius } cx={ b.x } cy={ b.y } style={ b.style } />)
        }
        <line x1={ -windowWidth / 2 } y1={ mouseY - windowHeight / 2 } x2={ windowWidth / 2 } y2={ mouseY - windowHeight / 2 } stroke={ isMouseButtonPushed ? 'red' : 'black' } />
        <line x1={ mouseX - windowWidth / 2 } y1={ -windowHeight / 2 } x2={ mouseX - windowWidth / 2 } y2={ windowHeight / 2 } stroke={ isMouseButtonPushed ? 'red' : 'black' } />
      </svg>
    )
  }
}

export default Container.create(App)

// vim: set ts=2 sw=2 et:
