/* @flow */
import type { State } from '../types.js'
import './App.css'
import styles from './App.module.css'

import React, { Component } from 'react'
import { Container } from 'flux/utils'

import store from '../store.js'
import * as actions from '../actions.js'

import { Layout, Menu, Icon, Row, Col, Switch, Card, Slider, InputNumber } from 'antd'

import LogarithmicSlider from './LogarithmicSlider.js'
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

  handleSpeedChange(value) {
    actions.changeSpeed(value)
  }

  render() {
    const { isRunning, speed } = this.state

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

                <Col className={ styles.optionsValue } span={ 18 }>
                  <LogarithmicSlider onChange={ value => this.handleScaleChange(value) }
                                     tipFormatter={ value => 'x' + value.toPrecision(4) }/>
                </Col>
              </Row>

              <Row>
                <Col span={ 6 }>Speed</Col>
                <Col className={ styles.optionsValue } span={ 18 }>
                  <LogarithmicSlider onChange={ value => this.handleSpeedChange(value) }
                                     tipFormatter={ value => 'x' + value.toPrecision(4) }/>
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
