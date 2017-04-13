/* @flow */
import type { State } from './types'

import chroma from 'chroma-js'
import { ReduceStore } from 'flux/utils'

import dispatcher from './dispatcher.js'

class Store extends ReduceStore {
  getInitialState(): State {
    return {
      windowWidth: null,
      windowHeight: null,
      centerX: 0,
      centerY: 0,
      leftButtonPressed: false,
      rightButtonPressed: false,
      mouseX: null,
      mouseY: null,
      mouseSvgX: null,
      mouseSvgY: null,
      touches: [],
      selectedBodyId: null,
      selectedBodyIndex: null,
      followingBodyId: null,
      followingBodyIndex: null,
      scale: 1,
      loop: 0,
      isRunning: true,
      isFullscreen: null,
      showState: false,
      bodies: [],
      newBody: null,
      speed: 1
    }
  }

  reduce(state, action): State {
    switch (action.type) {
      case 'application_started':
        return { ...state, ...action.payload }

      case 'update': {
        const nextState = {
          ...state,
          bodies: action.bodies,
          loop: state.loop + 1,
          timestamp: action.timestamp,
          fps: 1000 / (action.timestamp - state.timestamp),
        }

        if (state.followingBodyId === null) return nextState

        const followingBody = state.bodies[state.followingBodyIndex]
        const nextFollowingBody = action.bodies[state.followingBodyIndex]
        nextState.centerX += nextFollowingBody.x - followingBody.x
        nextState.centerY += nextFollowingBody.y - followingBody.y
        nextState.mouseSvgX += nextFollowingBody.x - followingBody.x
        nextState.mouseSvgY += nextFollowingBody.y - followingBody.y

        if (state.newBody === null) return nextState

        nextState.newBody.x += nextFollowingBody.x - followingBody.x
        nextState.newBody.y += nextFollowingBody.y - followingBody.y
        return nextState
      }

      case 'mouse_moved': {
        const nextState = {
          ...state,
          ...action.payload,
          mouseSvgX: (action.payload.mouseX - state.windowWidth  / 2) / state.scale + state.centerX,
          mouseSvgY: (action.payload.mouseY - state.windowHeight / 2) / state.scale + state.centerY,
        }

        if (!state.rightButtonPressed) return nextState

        nextState.centerX += (state.mouseX - nextState.mouseX) / state.scale
        nextState.centerY += (state.mouseY - nextState.mouseY) / state.scale
        return nextState
      }

      case 'left_button_pushed': {
        return {
          ...state,
          leftButtonPressed: true,
          newBody : {
            id: performance.now(),
            mass: 100,
            radius: 10,
            x: state.mouseSvgX,
            y: state.mouseSvgY,
            vx: 0,
            vy: 0,
            locus: [],
            color: chroma.hcl(Math.random() * 360, 150, 50).css(),
          }
        }
      }

      case 'right_button_pushed':
        return {
          ...state,
          rightButtonPressed: true,
        }

      case 'left_button_released':
        return {
          ...state,
          leftButtonPressed: false,
          newBody: null,
        }

      case 'right_button_released':
        return {
          ...state,
          rightButtonPressed: false,
        }

      case 'mouse_left':
        return {
          ...state,
          leftButtonPressed: false,
          rightButtonPressed: false,
          mouseX: null,
          mouseY: null,
          touches: [],
        }

      case 'multiply_scale':
        return {
          ...state,
          scale: state.scale * action.coefficient
        }

      case 'change_scale':
        return {
          ...state,
          scale: action.scale,
        }

      case 'pinch_start':
        return {
          ...state,
          ...action.payload,
          newBody: null,
        }

      case 'pinch_move': {
        const touches = state.touches
        const nextTouches = action.payload.touches

        return {
          ...state, ...action.payload,
          scale: state.scale * (Math.hypot(nextTouches[0].clientX - nextTouches[1].clientX, nextTouches[0].clientY - nextTouches[1].clientY) /
                                Math.hypot(touches[0].clientX - touches[1].clientX, touches[0].clientY - touches[1].clientY)),
          centerX: state.centerX + ((touches[0].clientX - nextTouches[0].clientX) + (touches[1].clientX - nextTouches[1].clientX)) / 2 / state.scale,
          centerY: state.centerY + ((touches[0].clientY - nextTouches[0].clientY) + (touches[1].clientY - nextTouches[1].clientY)) / 2 / state.scale,
        }
      }

      case 'select_body':
        return {
          ...state,
          ...action.payload,
          selectedBodyIndex: state.bodies.findIndex(b => b.id === action.payload.selectedBodyId),
        }

      case 'window_resized':
        return { ...state, ...action.payload }

      case 'delete_body':
        return {
          ...state,
          selectedBodyId: null,
          selectedBodyIndex: null,
          followingBodyId: state.selectedBodyId === state.followingBodyId ? null : state.followingBodyId,
          followingBodyIndex: state.selectedBodyId === state.followingBodyId ? null : state.followingBodyIdx,
          bodies: state.bodies.filter(body => body.id !== action.id),
        }

      case 'close_information_window':
        return {
          ...state,
          selectedBodyId: null,
          selectedBodyIndex: null,
        }

      case 'select_follow_target':
        return {
          ...state,
          ...action.payload,
          followingBodyIndex: state.bodies.findIndex(b => b.id === action.payload.followingBodyId),
        }

      case 'stop_following':
        return {
          ...state,
          followingBodyId: null,
          followingBodyIndex: null,
        }

      case 'toggle_run_pause':
        return {
          ...state,
          isRunning: !state.isRunning,
        }

      case 'fullscreen_changed':
        return { ...state, ...action.payload }

      case 'toggle_show_state':
        return {
          ...state,
          showState: !state.showState,
        }

      case 'change_speed':
        return {
          ...state,
          speed: action.speed,
        }

      default:
        return state
    }
  }
}

export default new Store(dispatcher)

// vim: set ts=2 sw=2 et:
