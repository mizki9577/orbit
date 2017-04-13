/* @flow */
import type { State } from '../types.js'
import './App.css'
import styles from './App.module.css'

import React, { Component } from 'react'
import { Container } from 'flux/utils'

import store from '../store.js'
import * as actions from '../actions.js'

import { Layout, Menu, Icon, Row, Col, Switch, Card, Slider, InputNumber } from 'antd'

import Drawer from './Drawer.js'

class App extends Component {
  state: State

  static getStores() {
    return [store]
  }

  static calculateState() {
    return store.getState()
  }

  componentDidMount() {
    actions.applicationStarted()
  }

  handleMenuClink({ key }) {
    switch (key) {
      case 'runpause':
        actions.toggleRunPause()
        break
    }
  }

  handleFullscreenChange(value) {
    actions.changeFullscreen(value)
  }

  handleScaleChange(value) {
    actions.changeScale(value)
  }

  handleScaleSliderChange(value, scaleBasis) {
    actions.changeScaleSlider(value, scaleBasis)
  }

  handleAfterScaleChange() {
    actions.scalingFinished()
  }

  handleSpeedChange(value) {
    actions.changeSpeed(value)
  }

  render() {
    const { isRunning, scale, scaleBasis, scaleSliderValue, speed } = this.state

    return (
      <Layout>
        <Layout>
          <Layout.Sider collapsible defaultCollapsed width={ 300 } collapsedWidth={ 0 }>
            <Card>
              <Row>
                <Col span={ 6 }>Fullscreen</Col>
                <Col className={ styles.optionsValue } span={ 18 }>
                  <Switch onChange={ value => this.handleFullscreenChange(value) } />
                </Col>
              </Row>

              <Row>
                <Col span={ 6 }>Scale</Col>
                <Col className={ styles.optionsValue } span={ 12 }>
                  <Slider min={ -1 } max={ 1 } step={ 0.01 }
                          value={ scaleSliderValue }
                          tipFormatter={ null }
                          onChange={ value => this.handleScaleSliderChange(value, scaleBasis) }
                          onAfterChange={ () => this.handleAfterScaleChange() } />
                </Col>
                <Col className={ styles.optionsValue } span={ 6 }>
                  <InputNumber min={ 0 } value={ scale }
                          onChange={ value => this.handleScaleChange(value) }
                          onAfterChange={ () => this.handleAfterScaleChange() } />
                </Col>
              </Row>

              <Row>
                <Col span={ 6 }>Speed</Col>
                <Col className={ styles.optionsValue } span={ 12 }>
                  <Slider min={ 0 } max={ 1 } step={ 0.001 } value={ speed }
                          onChange={ value => this.handleSpeedChange(value) } />
                </Col>
                <Col className={ styles.optionsValue } span={ 6 }>
                  <InputNumber min={ 0 } step={ 0.001 } value={ speed }
                               onChange={ value => this.handleSpeedChange(value) } />
                </Col>
              </Row>
            </Card>
          </Layout.Sider>

          <Layout.Content>
            <Drawer />
          </Layout.Content>
        </Layout>

        <Layout.Footer>
          <Menu theme="dark" mode="horizontal" onClick={ params => this.handleMenuClink(params) }>
            <Menu.Item key="runpause">
              <Icon type={ isRunning ? 'pause' : 'caret-right' }/>
            </Menu.Item>
          </Menu>
        </Layout.Footer>
      </Layout>
    )
  }
}

export default Container.create(App)

// vim: set ts=2 sw=2 et:
