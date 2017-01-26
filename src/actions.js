/* @flow */

import type { Touch } from './types'

import screenfull from 'screenfull'

import store from './store'
import dispatcher from './dispatcher'

export const applicationStarted = () => {
  window.requestAnimationFrame(update)
  dispatcher.dispatch({
    type: 'application_started',
    timestamp: performance.now()
  })
}

export const update = (timestamp: number) => {
  const { bodies, isRunning } = store.getState()
  if (!isRunning) return

  dispatcher.dispatch({
    type: 'update',
    timestamp,
    bodies: bodies.map(self => {
      let ax = 0
      let ay = 0

      for (const other of bodies) {
        if (self === other) continue
        const coefficient = -other.mass * ((self.x - other.x) ** 2 + (self.y - other.y) ** 2) ** -1.5
        ax += coefficient * (self.x - other.x)
        ay += coefficient * (self.y - other.y)
      }

      const vx = self.vx + ax
      const vy = self.vy + ay
      const x = self.x + vx
      const y = self.y + vy

      //const locus = [[self.x, self.y], ...self.locus]
      const locus = []
      return { ...self, x, y, vx, vy, locus }
    }),
  })

  window.requestAnimationFrame(update)
}

export const mouseMoved = (x: number, y: number) => {
  dispatcher.dispatch({
    type: 'mouse_moved',
    x, y,
  })
}

export const mouseButtonPushed = () => {
  dispatcher.dispatch({
    type: 'mouse_button_pushed',
  })
}

export const mouseButtonReleased = () => {
  dispatcher.dispatch({
    type: 'mouse_button_released',
  })
}

export const mouseLeft = () => {
  dispatcher.dispatch({
    type: 'mouse_left',
  })
}

export const touchStarted = (touches: Touch[]) => {
  if (touches.length >= 2) return
  dispatcher.dispatch({
    type: 'touch_started',
    touches,
  })
}

export const touchMoved = (touches: Touch[]) => {
  dispatcher.dispatch({
    type: 'touch_moved',
    touches,
  })
}

export const touchEnded = (touches: Touch[]) => {
  dispatcher.dispatch({
    type: 'touch_moved',
    touches,
  })
}

export const wheelMoved = (delta: number) => {
  const coefficient = delta > 0 ? 0.9
                    : delta < 0 ? 1.1
                                : 1
  dispatcher.dispatch({
    type: 'change_zoom_level',
    coefficient,
  })
}

export const bodyClicked = (id: number) => {
  dispatcher.dispatch({
    type: 'select_body',
    id,
  })
}

export const windowResized = (width:number, height: number) => {
  dispatcher.dispatch({
    type: 'window_resized',
    width, height,
  })
}

export const deleteButtonClicked = (id: number) => {
  dispatcher.dispatch({
    type: 'delete_body',
    id,
  })
}

export const closeButtonClicked = () => {
  dispatcher.dispatch({
    type: 'close_information_window',
  })
}

export const followTargetChanged = (id: number) => {
  dispatcher.dispatch({
    type: 'change_follow_target',
    id,
  })
}

export const stopFollowing = () => {
  dispatcher.dispatch({
    type: 'stop_following',
  })
}

export const toggleRunPause = () => {
  dispatcher.dispatch({
    type: 'toggle_run_pause',
  })
}

export const fullscreenToggleButtonClicked = () => {
  const { isFullscreen } = store.getState()
  if (isFullscreen) {
    screenfull.exit()
    dispatcher.dispatch({
      type: 'exit_fullscreen',
    })
  } else {
    screenfull.request()
    dispatcher.dispatch({
      type: 'enter_fullscreen',
    })
  }
}

// vim: set ts=2 sw=2 et:
