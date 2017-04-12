/* @flow */
import type { State } from '../types.js'
import './App.css'
import styles from './App.module.css'

import React, { Component } from 'react'
import { Container } from 'flux/utils'

import store from '../store.js'
import * as actions from '../actions.js'

import { Layout, Menu, Icon, Row, Col, Switch, Card } from 'antd'

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

  render() {
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
