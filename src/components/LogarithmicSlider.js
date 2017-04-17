/* @flow */
import React, { Component } from 'react'
import { Slider } from 'antd'

type Props = {
  resolution: ?number,
  value: number,
  onChange: (number) => any,
  tipFormatter: ?(number) => string,
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

  tipFormatter(sliderValue: number) {
    if (typeof this.props.tipFormatter === 'function') return this.props.tipFormatter(Math.E ** sliderValue)
    else return Math.E ** sliderValue
  }

  render() {
    return (
      <Slider min={ this.state.sliderMin } max={ this.state.sliderMax } step={ this.state.sliderStep }
              value={ Math.log(this.props.value) }
              tipFormatter={ this.props.tipFormatter === null ? null : sliderValue => this.tipFormatter(sliderValue) }
              onChange={ sliderValue => this.props.onChange(Math.E ** sliderValue) } />
    )
  }
}

export default LogarithmicSlider

// vim: set ts=2 sw=2 et:
