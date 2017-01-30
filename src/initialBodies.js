/* @flow */

import type { Body } from './types'

const n = 8, m = 100, c = 10, r = 200
const M = 10000, C = 20

const initialBodies: Body[] = [{
  id: 0,
  mass: M,
  radius: C,
  x : 0, y : 0,
  vx: 0, vy: 0,
  locus: [],
  style: { fill: 'hsl(  0, 100%,  0%)' },
}]

for (let i = 1; i <= n; ++i) {
  initialBodies.push({
    id: i,
    mass: m,
    radius: c,
    x : r * -Math.sin(i * Math.PI / n * 2),
    y : r *  Math.cos(i * Math.PI / n * 2),
    vx: (M / r) ** 0.5 * -Math.cos(i * Math.PI / n * 2),
    vy: (M / r) ** 0.5 * -Math.sin(i * Math.PI / n * 2),
    locus: [],
    style: { fill: `hsl(${360 / n * i}, 100%, 50%)` },
  })
}

export default initialBodies

  // vim: set ts=2 sw=2 et:
