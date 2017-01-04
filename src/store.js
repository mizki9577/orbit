/* @flow */

import { ReduceStore } from 'flux/utils'

import dispatcher from './dispatcher'

export type Body = {
  id: number,
  mass: number,
  radius: number,
  x: number,
  y: number,
  vx: number,
  vy: number,
}

class Store extends ReduceStore {
  getInitialState() {
    return {
      bodies: [
        { id: 0, mass: 1000, radius: 5, x:  100, y:  100, vx: -2, vy:  0 },
        { id: 1, mass: 1000, radius: 5, x: -100, y:  100, vx:  0, vy: -2 },
        { id: 2, mass: 1000, radius: 5, x: -100, y: -100, vx:  2, vy:  0 },
        { id: 3, mass: 1000, radius: 5, x:  100, y: -100, vx:  0, vy:  2 },
      ],
    }
  }

  reduce(state, action) {
    switch (action.type) {
      case 'update':
        return {
          bodies: state.bodies.map(body => {
            const [ax, ay] = getGravitionalAcceleration(body, state.bodies)
            const vx = body.vx + ax
            const vy = body.vy + ay
            const x = body.x + vx
            const y = body.y + vy
            return { ...body, x, y, vx, vy }
          })
        }
    }
  }
}

function getGravitionalAcceleration(self, others) {
  let ax = 0
  let ay = 0

  for (const other of others) {
    if (self === other) continue
    const coefficient = -other.mass / ((self.x - other.x) ** 2 + (self.y - other.y) ** 2) ** 1.5
    ax += coefficient * (self.x - other.x)
    ay += coefficient * (self.y - other.y)
  }

  return [ax, ay]
}

export default new Store(dispatcher)

// vim: set ts=2 sw=2 et:
