/* @flow */
import type { Body } from './types.js'
import chroma from 'chroma-js'

const n = 16, m = 10, c = 5, r = 200
const M = 1000, C = 10

const initialBodies: Body[] = [{
  id: 0,
  mass: M,
  radius: C,
  x : 0, y : 0,
  vx: 0, vy: 0,
  locus: [],
  color: chroma.hcl(0, 0, 0).css(),
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
    color: chroma.hcl(360 / n * i, 150, 50).css(),
  })
}

export default initialBodies

  // vim: set ts=2 sw=2 et:
