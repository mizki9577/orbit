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

export const leftButtonPushed = () => {
  dispatcher.dispatch({
    type: 'left_button_pushed',
  })
}

export const rightButtonPushed = () => {
  dispatcher.dispatch({
    type: 'right_button_pushed',
  })
}

export const leftButtonReleased = () => {
  const state = store.getState()
  const newBody = state.newBody
  newBody.vx = (newBody.x - state.mouseSvgX) / state.scale / state.speed / 100
  newBody.vy = (newBody.y - state.mouseSvgY) / state.scale / state.speed / 100

  if (state.followingBodyId !== null) {
    const followingBody = state.bodies[state.followingBodyIndex]
    newBody.vx += followingBody.vx
    newBody.vy += followingBody.vy
  }

  bodyUpdater.addBody(newBody)

  dispatcher.dispatch({
    type: 'left_button_released',
  })
}

export const rightButtonReleased = () => {
  dispatcher.dispatch({
    type: 'right_button_released',
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
    type: 'multiply_scale',
    coefficient,
  })
}

// vim: set ts=2 sw=2 et:
