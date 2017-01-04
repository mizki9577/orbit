/* @flow */

import type { Body } from './store'

import React, { Component } from 'react'
import { Container } from 'flux/utils'

import store from './store'
import { update } from './actions'

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
    return {
      ...prevState,
      bodies: store.getState().bodies,
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

  render() {
    const { width, height, bodies } = this.state
    return (
      <svg style={ App.style } width={ width } height={ height } viewBox={`${-width / 2} ${-height / 2} ${width} ${height}`}>
      {
        bodies.map(b => <circle key={ b.id } r={ b.radius } cx={ b.x } cy={ b.y } style={ b.style } />)
      }
      </svg>
    )
  }
}

export default Container.create(App)

// vim: set ts=2 sw=2 et:
