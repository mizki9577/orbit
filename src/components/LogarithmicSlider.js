/* @flow */
import React, { Component } from 'react'
import { Slider } from 'react-mdl'

type Props = {
  resolution: ?number,
  value: number,
  onChange: (number) => any,
}

type State = {
  sliderMin: number,
  sliderMax: number,
  sliderStep: number,
}

class LogarithmicSlider extends Component {
  state: State

  static defaultProps = {
    resolution: 1000,
  }

  constructor(props: Props) {
    super(props)
    const sliderMin = Math.log(this.props.min)
    const sliderMax = Math.log(this.props.max)
    const sliderStep = (sliderMax - sliderMin) / this.props.resolution
    this.state = {
      sliderMin,
      sliderMax,
      sliderStep,
    }
  }

  render() {
    return (
      <Slider min={ this.state.sliderMin } max={ this.state.sliderMax } step={ this.state.sliderStep }
              value={ Math.log(this.props.value) }
              onChange={ ev => this.props.onChange(Math.E ** ev.target.value) } />
    )
  }
}

export default LogarithmicSlider

// vim: set ts=2 sw=2 et:
