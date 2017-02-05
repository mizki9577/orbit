/* @flow */

import type { State } from './types'

import { ReduceStore } from 'flux/utils'
import dispatcher from './dispatcher.js'

import initialBodies from './initialBodies.js'

class Store extends ReduceStore {
  getInitialState(): State {
    return {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      bodies: initialBodies,
      mouseX: null,
      mouseY: null,
      touches: [],
      centerX: 0,
      centerY: 0,
      mousePressed: false,
      selectedBodyId: null,
      scale: 1,
      followingBodyId: null,
      loop: 0,
      isRunning: true,
      isFullscreen: null,
      showState: false,
    }
  }

  reduce(state, action): State {
    switch (action.type) {
      case 'application_started':
        return {
          ...state,
          timestamp: action.timestamp,
          isFullscreen: action.isFullscreen,
        }

      case 'update': {
        const nextState = {
          ...state,
          timestamp: action.timestamp,
          fps: 1000 / (action.timestamp - state.timestamp),
          bodies: action.bodies,
          loop: state.loop + 1,
        }

        if (state.followingBodyId !== null) {
          const followingBody = state.bodies.find(b => b.id === state.followingBodyId)
          const followingBodyNext = action.bodies.find(b => b.id === state.followingBodyId)
          Object.assign(nextState, {
            centerX: state.centerX + (followingBodyNext.x - followingBody.x),
            centerY: state.centerY + (followingBodyNext.y - followingBody.y),
          })
        }

        return nextState
      }

      case 'mouse_moved': {
        const nextState = {
          ...state,
          mouseX: action.x,
          mouseY: action.y,
        }

        if (state.mousePressed) {
          Object.assign(nextState, {
            centerX: state.centerX + (state.mouseX - nextState.mouseX) / state.scale,
            centerY: state.centerY + (state.mouseY - nextState.mouseY) / state.scale,
          })
        }

        return nextState
      }

      case 'mouse_button_pushed':
        return {
          ...state,
          mousePressed: true,
        }

      case 'mouse_button_released':
        return {
          ...state,
          mousePressed: false,
        }

      case 'mouse_left':
        return {
          ...state,
          mousePressed: false,
          mouseX: null,
          mouseY: null,
          touches: [],
        }

      case 'change_scale':
        return {
          ...state,
          scale: state.scale * action.coefficient
        }

      case 'pinch_start':
        return {
          ...state,
          touches: action.touches,
        }

      case 'pinch_move':
        return {
          ...state,
          touches: action.touches,
          scale: state.scale * (Math.hypot(action.touches[0].clientX - action.touches[1].clientX,
                                           action.touches[0].clientY - action.touches[1].clientY) /
                                Math.hypot(state.touches[0].clientX - state.touches[1].clientX,
                                           state.touches[0].clientY - state.touches[1].clientY)),
          centerX: state.centerX + ((state.touches[0].clientX + state.touches[1].clientX) - (action.touches[0].clientX + action.touches[1].clientX)) / 2 / state.scale,
          centerY: state.centerY + ((state.touches[0].clientY + state.touches[1].clientY) - (action.touches[0].clientY + action.touches[1].clientY)) / 2 / state.scale,
        }

      case 'select_body':
        return {
          ...state,
          selectedBodyId: action.id,
        }

      case 'window_resized':
        return {
          ...state,
          windowWidth: action.width,
          windowHeight: action.height,
        }

      case 'delete_body':
        return {
          ...state,
          selectedBodyId: null,
          followingBodyId: state.selectedBodyId === state.followingBodyId ? null : state.followingBodyId,
          bodies: state.bodies.filter(body => body.id !== action.id),
        }

      case 'close_information_window':
        return {
          ...state,
          selectedBodyId: null,
        }

      case 'select_follow_target':
        return {
          ...state,
          followingBodyId: action.id,
        }

      case 'stop_following':
        return {
          ...state,
          followingBodyId: null,
        }

      case 'toggle_run_pause':
        return {
          ...state,
          isRunning: !state.isRunning,
        }

      case 'fullscreen_changed':
        return {
          ...state,
          isFullscreen: action.isFullscreen,
        }

      case 'toggle_show_state':
        return {
          ...state,
          showState: !state.showState,
        }

      default:
        return state
    }
  }
}

export default new Store(dispatcher)

// vim: set ts=2 sw=2 et:
