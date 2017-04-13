/* @flow */
import store from '../store.js'
import dispatcher from '../dispatcher.js'
import * as bodyUpdater from './bodyUpdater.js'

export const selectBody = (selectedBodyId: number) => {
  dispatcher.dispatch({
    type: 'select_body',
    payload: { selectedBodyId },
  })
}

export const deleteBody = (id: number) => {
  dispatcher.dispatch({
    type: 'delete_body',
    id,
  })
}

export const closeInformationWindow = () => {
  dispatcher.dispatch({
    type: 'close_information_window',
  })
}

export const selectFollowTarget = (followingBodyId: number) => {
  dispatcher.dispatch({
    type: 'select_follow_target',
    payload: { followingBodyId },
  })
}

export const stopFollowing = () => {
  dispatcher.dispatch({
    type: 'stop_following',
  })
}

export const toggleRunPause = () => {
  if (store.getState().isRunning) {
    bodyUpdater.pause()
  } else {
    bodyUpdater.run()
  }

  dispatcher.dispatch({
    type: 'toggle_run_pause',
  })
}

export const toggleShowState = () => {
  dispatcher.dispatch({
    type: 'toggle_show_state',
  })
}

export const selectMoveMode = () => {
  dispatcher.dispatch({
    type: 'select_move_mode',
  })
}

export const selectCreateMode = () => {
  dispatcher.dispatch({
    type: 'select_create_mode',
  })
}

export const changeScale = (scale: number) => {
  dispatcher.dispatch({
    type: 'change_scale',
    scale,
  })
}

export const changeScaleSlider = (scaleSliderValue: number, scaleBasis: number) => {
  dispatcher.dispatch({
    type: 'change_scale_slider',
    scale: scaleBasis * 10 ** scaleSliderValue,
    scaleSliderValue,
  })
}

export const scalingFinished = () => {
  dispatcher.dispatch({
    type: 'update_scale_range',
  })
}

export const changeSpeed = (speed: number) => {
  bodyUpdater.setSpeed(speed)
  dispatcher.dispatch({
    type: 'change_speed',
    speed,
  })
}

// vim: set ts=2 sw=2 et:
