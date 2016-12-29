import React, { Component } from 'react'
import { Container } from 'flux/utils'

import store from './store'
import { update } from './actions'

class App extends Component {
  static style = {
    position: 'absolute',
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
      width : null,
      height: null,

      bodies: [],
    }

    this.handleResize = ::this.handleResize
  }

  componentWillMount() {
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  }

  componentDidMount() {
    window.requestAnimationFrame(::this.handleFrame)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize() {
    this.setState({
      width : window.innerWidth,
      height: window.innerHeight,
    })
  }

  handleFrame() {
    update()
    window.requestAnimationFrame(::this.handleFrame)
  }

  render() {
    const { width, height, bodies } = this.state
    return (
      <svg id="app" style={ App.style } width={ width } height={ height } viewBox={`${-width / 2} ${-height / 2} ${width} ${height}`}>
      {
        bodies.map(b => <circle key={ b.id } r={ b.radius } cx={ b.x } cy={ b.y } />)
      }
      </svg>
    )
  }
}

export default Container.create(App)

// vim: set ts=2 sw=2 et:
