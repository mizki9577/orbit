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

  render() {
    const { scale, scaleBasis, scaleSliderValue } = this.state

    return (
      <Layout>
        <Layout>
          <Layout.Sider collapsible defaultCollapsed width={ 400 } collapsedWidth={ 0 }>
            <Card>
              <Row>
                <Col span={ 12 }>Fullscreen</Col>
                <Col className={ styles.optionsValue } span={ 12 }>
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
            </Card>
          </Layout.Sider>

          <Layout.Content>
            <Drawer />
          </Layout.Content>
        </Layout>

        <Layout.Footer>
          <Menu theme="dark" mode="horizontal">
            <Menu.Item>
              <Icon type="caret-right" />
            </Menu.Item>
          </Menu>
        </Layout.Footer>
      </Layout>
    )
  }
}

export default Container.create(App)

// vim: set ts=2 sw=2 et:
