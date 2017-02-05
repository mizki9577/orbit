/* @flow */
import screenfull from 'screenfull'
import dispatcher from '../dispatcher.js'

import { update } from '../actions.js'

export const applicationStarted = () => {
  window.requestAnimationFrame(update)
  window.addEventListener('resize', windowResized)
  document.addEventListener(screenfull.raw.fullscreenchange, fullscreenChanged)

  dispatcher.dispatch({
    type: 'application_started',
    timestamp: performance.now()
  })
}

export const windowResized = () => {
  dispatcher.dispatch({
    type: 'window_resized',
    width: window.innerWidth,
    height: window.innerHeight,
  })
}

export const toggleFullscreen = () => {
  screenfull.toggle()
}

export const fullscreenChanged = () => {
  dispatcher.dispatch({
    type: 'fullscreen_changed',
    isFullscreen: screenfull.isFullscreen,
  })
}

// vim: set ts=2 sw=2 et:
