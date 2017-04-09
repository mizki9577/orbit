/* @flow */
import type { Body } from '../types'

import screenfull from 'screenfull'
import store from '../store.js'
import dispatcher from '../dispatcher.js'
import * as bodyUpdater from './bodyUpdater.js'

export const applicationStarted = () => {
  window.requestAnimationFrame(frame)
  window.addEventListener('resize', windowResized)
  document.addEventListener(screenfull.raw.fullscreenchange, fullscreenChanged)

  bodyUpdater.init(store.getState().bodies)

  dispatcher.dispatch({
    type: 'application_started',
    payload: {
      timestamp: performance.now(),
      isFullscreen: screenfull.isFullscreen,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    }
  })
}

export const frame = (timestamp: number) => {
  if (store.getState().isRunning) {
    bodyUpdater.getBodies().then(bodies => {
      dispatcher.dispatch({
        type: 'update',
        bodies,
        timestamp,
      })
    })
  }
  window.requestAnimationFrame(frame)
}

export const windowResized = () => {
  dispatcher.dispatch({
    type: 'window_resized',
    payload: {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    },
  })
}

export const toggleFullscreen = () => {
  screenfull.toggle()
}

export const fullscreenChanged = () => {
  dispatcher.dispatch({
    type: 'fullscreen_changed',
    payload: {
      isFullscreen: screenfull.isFullscreen,
    },
  })
}

// vim: set ts=2 sw=2 et:
