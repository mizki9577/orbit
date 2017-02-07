/* @flow */
import dispatcher from '../dispatcher.js'

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
