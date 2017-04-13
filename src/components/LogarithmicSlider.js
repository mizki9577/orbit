/* @flow */
import React, { Component } from 'react'
import { Slider } from 'antd'

type Props = {
  step: ?number,
  defaultValue: ?number,
  onChange: ?(number) => any,
  tipFormatter: ?(number) => string,
}

type State = {
  sliderValue: number,
  sliderBasis: number,
  trueValue: number,
}

class LogarithmicSlider extends Component {
  state: State

  static defaultProps = {
    step: 0.01,
    defaultValue: 1,
  }

  constructor(props: Props) {
    super(props)
    this.state = {
      sliderValue: 0,
      sliderBasis: this.props.defaultValue,
      trueValue: this.props.defaultValue,
    }
  }

  handleChange(value: number) {
    this.setState({
      sliderValue: value,
      trueValue: this.state.sliderBasis * 10 ** value,
    })
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(this.state.trueValue)
    }
  }

  handleAfterChange() {
    this.setState({
      sliderValue: 0,
      sliderBasis: this.state.trueValue,
    })
  }

  tipFormatter() {
    if (typeof this.props.tipFormatter === 'function') return this.props.tipFormatter(this.state.trueValue)
    else return this.state.trueValue
  }

  render() {
    return (
      <Slider min={ -1 } max={ 1 } step={ this.props.step }
              value={ this.state.sliderValue }
              tipFormatter={ this.props.tipFormatter === null ? null : () => this.tipFormatter(this.state.trueValue) }
              onChange={ value => this.handleChange(value) }
              onAfterChange={ () => this.handleAfterChange() } />
    )
  }
}

export default LogarithmicSlider

// vim: set ts=2 sw=2 et:
