/* @flow */

import dispatcher from '../dispatcher.js'

export const pinchStart = (touches: TouchList) => {
  dispatcher.dispatch({
    type: 'pinch_start',
    payload: { touches },
  })
}

export const pinchMove = (touches: TouchList) => {
  dispatcher.dispatch({
    type: 'pinch_move',
    payload: { touches },
  })
}

// vim: set ts=2 sw=2 et:
