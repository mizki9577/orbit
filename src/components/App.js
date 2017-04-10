/* @flow */
import type { State } from '../types.js'
import './App.css'

import React, { Component } from 'react'
import { Container } from 'flux/utils'

import store from '../store.js'
import * as actions from '../actions.js'

import { Layout, Menu, Icon } from 'antd'

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

  render() {
    return (
      <Layout>
        <Layout.Sider collapsible collapsed trigger={ null } width={ 400 } collapsedWidth={ 0 } />

        <Layout>
          <Layout.Content>
            <Drawer />
          </Layout.Content>

          <Layout.Footer>
            <Menu theme="dark" mode="horizontal">
              <Menu.Item>
                <Icon type="menu-unfold" />
              </Menu.Item>
              <Menu.Item>
                <Icon type="caret-right" />
              </Menu.Item>
            </Menu>
          </Layout.Footer>
        </Layout>
      </Layout>
    )
  }
}

export default Container.create(App)

// vim: set ts=2 sw=2 et:
