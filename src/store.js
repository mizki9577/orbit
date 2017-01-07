/* @flow */

import { ReduceStore } from 'flux/utils'
import dispatcher from './dispatcher'

import initialBodies from './initialBodies'

class Store extends ReduceStore {
  getInitialState() {
    return {
      bodies: initialBodies,
      mouseX: null,
      mouseY: null,
      centerX: 0,
      centerY: 0,
      isMouseButtonPushed: false,
      zoomLevel: 1,
    }
  }

  reduce(state, action) {
    switch (action.type) {
      case 'update':
        return {
          ...state,
          bodies: action.bodies
        }

      case 'mouse_moved':
        const nextState = {
          ...state,
          mouseX: action.x,
          mouseY: action.y,
        }

        if (state.isMouseButtonPushed) {
          Object.assign(nextState, {
            centerX: state.centerX + (state.mouseX - nextState.mouseX) / state.zoomLevel,
            centerY: state.centerY + (state.mouseY - nextState.mouseY) / state.zoomLevel,
          })
        }

        return nextState

      case 'mouse_button_pushed':
        return {
          ...state,
          isMouseButtonPushed: true,
        }

      case 'mouse_button_released':
        return {
          ...state,
          isMouseButtonPushed: false,
        }

      case 'mouse_left':
        return {
          ...state,
          isMouseButtonPushed: false,
          mouseX: null,
          mouseY: null,
        }

      case 'change_zoom_level':
        return {
          ...state,
          zoomLevel: state.zoomLevel * action.coefficient
        }

      case 'window_resized':
        return {
          ...state,
          windowWidth: action.width,
          windowHeight: action.height,
        }
    }
  }
}

export default new Store(dispatcher)

// vim: set ts=2 sw=2 et:
