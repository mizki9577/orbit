import { ReduceStore } from 'flux/utils'

import { G } from './constants'
import dispatcher from './dispatcher'

class Store extends ReduceStore {
  getInitialState() {
    return {
      bodies: [
        {
          id: 0,
          mass: 1000,
          radius: 5,
          x: 100,
          y: 100,
          vx: -2,
          vy: 0,
        },
        {
          id: 1,
          mass: 1000,
          radius: 5,
          x: -100,
          y: 100,
          vx: 0,
          vy: -2,
        },
        {
          id: 2,
          mass: 1000,
          radius: 5,
          x: -100,
          y: -100,
          vx: 2,
          vy: 0,
        },
        {
          id: 3,
          mass: 1000,
          radius: 5,
          x: 100,
          y: -100,
          vx: 0,
          vy: 2,
        },
      ],
    }
  }

  reduce(state, action) {
    switch (action.type) {
      case 'update':
        return {
          bodies: state.bodies.map(body => {
            const ax = state.bodies.map(other => body === other ? 0 : other.mass * (other.x - body.x) / ((body.x - other.x) ** 2 + (body.y - other.y) ** 2) ** 1.5)
                                   .reduce((a, b) => a + b)
            const ay = state.bodies.map(other => body === other ? 0 : other.mass * (other.y - body.y) / ((body.x - other.x) ** 2 + (body.y - other.y) ** 2) ** 1.5)
                                   .reduce((a, b) => a + b)

            return {
              ...body,
              x: body.x + body.vx + ax,
              y: body.y + body.vy + ay,
              vx: body.vx + ax,
              vy: body.vy + ay,
            }
          })
        }
    }
  }
}

export default new Store(dispatcher)

// vim: set ts=2 sw=2 et:
