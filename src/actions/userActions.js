/* @flow */

import store from '../store.js'
import dispatcher from '../dispatcher.js'

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
}

export const selectBody = (id: number) => {
  dispatcher.dispatch({
    type: 'select_body',
    id,
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

export const selectFollowTarget = (id: number) => {
  dispatcher.dispatch({
    type: 'select_follow_target',
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

export const toggleShowState = () => {
  dispatcher.dispatch({
    type: 'toggle_show_state',
  })
}

// vim: set ts=2 sw=2 et:
