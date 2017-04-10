/* @flow */
import store from '../store.js'
import dispatcher from '../dispatcher.js'
import * as bodyUpdater from './bodyUpdater.js'

export const mouseMoved = (mouseX: number, mouseY: number) => {
  dispatcher.dispatch({
    type: 'mouse_moved',
    payload: {
      mouseX,
      mouseY,
    }
  })
}

export const mouseButtonPushed = () => {
  dispatcher.dispatch({
    type: 'mouse_button_pushed',
  })
}

export const mouseButtonReleased = () => {
  const state = store.getState()
  if (state.operationMode === 'create') {
    const newBody = state.newBody
    newBody.vx = (newBody.x - state.mouseSvgX) / 30
    newBody.vy = (newBody.y - state.mouseSvgY) / 30

    if (state.followingBodyId !== null) {
      const followingBody = state.bodies[state.followingBodyIndex]
      newBody.vx += followingBody.vx
      newBody.vy += followingBody.vy
    }

    bodyUpdater.addBody(newBody)
  }

  dispatcher.dispatch({
    type: 'mouse_button_released',
  })
}

export const mouseLeft = () => {
  dispatcher.dispatch({
    type: 'mouse_left',
  })
}

export const wheelMoved = (delta: number) => {
  const coefficient = delta > 0 ? 0.9
                    : delta < 0 ? 1.1
                                : 1
  dispatcher.dispatch({
    type: 'change_scale',
    coefficient,
  })
}

// vim: set ts=2 sw=2 et:
