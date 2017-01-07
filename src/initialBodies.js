/* @flow */

const n = 8

const initialBodies = [{
  id: 0,
  mass: 10000,
  radius: 20,
  x : 0, y : 0,
  vx: 0, vy: 0,
  style: { fill: 'hsl(  0, 100%,  0%)' },
}]

for (let i = 1; i <= n; ++i) {
  initialBodies.push({
    id: i,
    mass: 100,
    radius: 10,
    x : 200 * -Math.sin(i * Math.PI / n * 2),
    y : 200 *  Math.cos(i * Math.PI / n * 2),
    vx: 5 * -Math.cos(i * Math.PI / n * 2),
    vy: 5 * -Math.sin(i * Math.PI / n * 2),
    style: { fill: `hsl(${360 / n * i}, 100%, 50%)` },
  })
}

export default initialBodies

  // vim: set ts=2 sw=2 et:
