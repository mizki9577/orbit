/* @flow */

import type { Body } from './store'

import React, { Component } from 'react'
import { Container } from 'flux/utils'

import store from './store'
import { update, mouseMoved, mouseButtonPushed, mouseButtonReleased } from './actions'

type State = {
  width: number,
  height: number,
  bodies: Body[],
}

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
    const state = store.getState()
    return {
      ...prevState,
      bodies: state.bodies,
      mouseX: state.mouseX,
      mouseY: state.mouseY,
      isMouseButtonPushed: state.isMouseButtonPushed,
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      width : 0,
      height: 0,

      bodies: [],
    }
  }

  componentWillMount() {
    this.handleResize()
    window.addEventListener('resize', this.handleResize.bind(this))
  }

  componentDidMount() {
    window.requestAnimationFrame(this.handleFrame.bind(this))
  }

  handleResize() {
    this.setState({
      width : window.innerWidth,
      height: window.innerHeight,
    })
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
    const { width, height, mouseX, mouseY, isMouseButtonPushed, bodies } = this.state
    return (
      <svg style={ App.style } width={ width } height={ height } viewBox={`${-width / 2} ${-height / 2} ${width} ${height}`}
           onMouseMove={ this.handleMouseMove.bind(this) } onMouseDown={ this.handleMouseDown.bind(this) } onMouseUp={ this.handleMouseUp.bind(this) }>
        {
          bodies.map(b => <circle key={ b.id } r={ b.radius } cx={ b.x } cy={ b.y } style={ b.style } />)
        }
        <line x1={ -width / 2 } y1={ mouseY - height / 2 } x2={ width / 2 } y2={ mouseY - height / 2 } stroke={ isMouseButtonPushed ? 'red' : 'black' } />
        <line x1={ mouseX - width / 2 } y1={ -height / 2 } x2={ mouseX - width / 2 } y2={ height / 2 } stroke={ isMouseButtonPushed ? 'red' : 'black' } />
      </svg>
    )
  }
}

export default Container.create(App)

// vim: set ts=2 sw=2 et:
