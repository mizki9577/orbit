import React, { Component } from 'react'

class App extends Component {
  static style = {
    position: 'absolute',
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

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize() {
    this.setState({
      width : window.innerWidth,
      height: window.innerHeight,
    })
  }

  render() {
    const { width, height } = this.state
    return (
      <svg id="app" style={ App.style } width={ width } height={ height }viewBox={`0 0 ${width} ${height}`}>
      </svg>
    )
  }
}

export default App

// vim: set ts=2 sw=2 et:
