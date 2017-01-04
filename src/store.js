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
    const c1 = 1 / 2 ** 0.5
    const c2 = c1 * 100
    return {
      bodies: [
        { id: 0, mass: 50, radius: 10, x:  100, y:    0, vx:   0, vy:   1, style: { fill: 'hsl(  0, 100%, 50%)' }, },
        { id: 1, mass: 50, radius: 10, x:   c2, y:   c2, vx: -c1, vy:  c1, style: { fill: 'hsl( 45, 100%, 50%)' }, },
        { id: 2, mass: 50, radius: 10, x:    0, y:  100, vx: - 1, vy:   0, style: { fill: 'hsl( 90, 100%, 50%)' }, },
        { id: 3, mass: 50, radius: 10, x:  -c2, y:   c2, vx: -c1, vy: -c1, style: { fill: 'hsl(135, 100%, 50%)' }, },
        { id: 4, mass: 50, radius: 10, x: -100, y:    0, vx:   0, vy: - 1, style: { fill: 'hsl(180, 100%, 50%)' }, },
        { id: 5, mass: 50, radius: 10, x:  -c2, y:  -c2, vx:  c1, vy: -c1, style: { fill: 'hsl(225, 100%, 50%)' }, },
        { id: 6, mass: 50, radius: 10, x:    0, y: -100, vx:   1, vy:   0, style: { fill: 'hsl(270, 100%, 50%)' }, },
        { id: 7, mass: 50, radius: 10, x:   c2, y:  -c2, vx:  c1, vy:  c1, style: { fill: 'hsl(315, 100%, 50%)' }, },
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
    const coefficient = -other.mass * ((self.x - other.x) ** 2 + (self.y - other.y) ** 2) ** -1.5
    ax += coefficient * (self.x - other.x)
    ay += coefficient * (self.y - other.y)
  }

  return [ax, ay]
}

export default new Store(dispatcher)

// vim: set ts=2 sw=2 et:
