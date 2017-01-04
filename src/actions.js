/* @flow */

import store from './store'
import dispatcher from './dispatcher'

export const update = () => {
  const { bodies } = store.getState()
  dispatcher.dispatch({
    type: 'update',
    bodies: bodies.map(body => {
      const [ax, ay] = getGravitionalAcceleration(body, bodies)
      const vx = body.vx + ax
      const vy = body.vy + ay
      const x = body.x + vx
      const y = body.y + vy
      return { ...body, x, y, vx, vy }
    }),
  })
}

function getGravitionalAcceleration(self, others) {
  let ax = 0
  let ay = 0

  for (const other of others) {
    if (self === other) continue
    const coefficient = -other.mass * ((self.x - other.x) ** 2 + (self.y - other.y) ** 2) ** -1.5
    ax += coefficient * (self.x - other.x)
    ay += coefficient * (self.y - other.y)
  }

  return [ax, ay]
}

// vim: set ts=2 sw=2 et:
