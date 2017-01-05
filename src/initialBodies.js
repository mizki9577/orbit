/* @flow */

const rt = 2 ** -0.5
const v1 = 5
const v2 = v1 * rt
const r1 = 200
const r2 = r1 * rt

export default [
  { id: 0, mass: 10000, radius: 20, x:   0, y:   0, vx:   0, vy:   0, style: { fill: 'hsl(  0, 100%,  0%)' }, },
  { id: 1, mass:   100, radius: 10, x:  r1, y:   0, vx:   0, vy:  v1, style: { fill: 'hsl(  0, 100%, 50%)' }, },
  { id: 2, mass:   100, radius: 10, x:  r2, y:  r2, vx: -v2, vy:  v2, style: { fill: 'hsl( 45, 100%, 50%)' }, },
  { id: 3, mass:   100, radius: 10, x:   0, y:  r1, vx: -v1, vy:   0, style: { fill: 'hsl( 90, 100%, 50%)' }, },
  { id: 4, mass:   100, radius: 10, x: -r2, y:  r2, vx: -v2, vy: -v2, style: { fill: 'hsl(135, 100%, 50%)' }, },
  { id: 5, mass:   100, radius: 10, x: -r1, y:   0, vx:   0, vy: -v1, style: { fill: 'hsl(180, 100%, 50%)' }, },
  { id: 6, mass:   100, radius: 10, x: -r2, y: -r2, vx:  v2, vy: -v2, style: { fill: 'hsl(225, 100%, 50%)' }, },
  { id: 7, mass:   100, radius: 10, x:   0, y: -r1, vx:  v1, vy:   0, style: { fill: 'hsl(270, 100%, 50%)' }, },
  { id: 8, mass:   100, radius: 10, x:  r2, y: -r2, vx:  v2, vy:  v2, style: { fill: 'hsl(315, 100%, 50%)' }, },
]

  // vim: set ts=2 sw=2 et: