/* @flow */
import type { State } from '../types.js'
import './App.css'

import React, { Component } from 'react'
import { Container } from 'flux/utils'

import store from '../store.js'
import * as actions from '../actions.js'

import { Layout, Drawer, Content, Header, List, ListItem, ListItemContent, ListItemAction, DataTable, TableHeader, Switch } from 'react-mdl'

import LogarithmicSlider from './LogarithmicSlider.js'
import MyDrawer from './Drawer.js'

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

  handleRunPauseChange() {
    actions.toggleRunPause()
  }

  handleFullscreenChange() {
    actions.toggleFullscreen()
  }

  handleScaleChange(value) {
    actions.changeScale(value)
  }

  handleSpeedChange(value) {
    actions.changeSpeed(value)
  }

  handleNewBodyRadiusChange(value) {
    actions.changeNewBodyRadius(value)
  }

  handleNewBodyMassChange(value) {
    actions.changeNewBodyMass(value)
  }

  handleFollowChange(value, id) {
    if (value) {
      actions.selectFollowTarget(id)
    } else {
      actions.stopFollowing()
    }
  }

  render() {
    const { isRunning, isFullscreen, scale, speed, newBodyRadius, newBodyMass, bodies, selectedBodyIndex, followingBodyId } = this.state
    const selectedBody = selectedBodyIndex == null ? null : bodies[selectedBodyIndex]

    return (
      <Layout>
        <Header transparent style={{ color: 'black' }} />
        <Drawer title="Orbit">
          <List>
            <ListItem onClick={ () => this.handleRunPauseChange() }>
              <ListItemContent icon={ isRunning ? 'pause' : 'play_arrow' }>{ isRunning ? 'Pause' : 'Run' }</ListItemContent>
            </ListItem>

            <ListItem onClick={ () => this.handleFullscreenChange() }>
              <ListItemContent icon={ isFullscreen ? 'fullscreen_exit' : 'fullscreen' }>{ isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen' }</ListItemContent>
            </ListItem>

            <ListItem>
              <ListItemContent>Scale</ListItemContent>
              <ListItemAction>
                <LogarithmicSlider min={ 2**-16 } max={ 2**16 }
                                  value={ scale }
                                  onChange={ value => this.handleScaleChange(value) } />
              </ListItemAction>
            </ListItem>

            <ListItem>
              <ListItemContent>Speed</ListItemContent>
              <ListItemAction>
                <LogarithmicSlider min={ 2**-16 } max={ 2**16 }
                                  value={ speed }
                                  onChange={ value => this.handleSpeedChange(value) } />
              </ListItemAction>
            </ListItem>

            <ListItem>
              <ListItemContent>Radius</ListItemContent>
              <ListItemAction>
                <LogarithmicSlider min={ 2**-16 } max={ 2**16 }
                                  value={ newBodyRadius }
                                  onChange={ value => this.handleNewBodyRadiusChange(value) } />
              </ListItemAction>
            </ListItem>

            <ListItem>
              <ListItemContent>Mass</ListItemContent>
              <ListItemAction>
                <LogarithmicSlider min={ 2**-16 } max={ 2**16 }
                                  value={ newBodyMass }
                                  onChange={ value => this.handleNewBodyMassChange(value) } />
              </ListItemAction>
            </ListItem>
          </List>

          { selectedBody === null ? null :
            <div>
              <Switch checked={ followingBodyId === selectedBody.id } onChange={ ev => this.handleFollowChange(ev.target.value, selectedBody.id) }>Follow</Switch>
              <DataTable rows={[
                { k: 'mass', v: selectedBody.mass },
                { k: 'radius', v: selectedBody.radius },
                { k: 'x', v: selectedBody.x.toPrecision(4) },
                { k: 'y', v: selectedBody.y.toPrecision(4) },
                { k: 'vx', v: selectedBody.vx.toPrecision(4) },
                { k: 'vy', v: selectedBody.vy.toPrecision(4) },
              ]}>
                <TableHeader name="k" />
                <TableHeader name="v" />
              </DataTable>
            </div>
          }
        </Drawer>

        <Content>
          <MyDrawer />
        </Content>
      </Layout>
    )
  }
}

export default Container.create(App)

// vim: set ts=2 sw=2 et:
