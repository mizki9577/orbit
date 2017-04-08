/* @flow */
let bodies = []
let isRunning = true

self.onmessage = ({ data: { type, value } }) => {
  switch (type) {
    case 'init':
      bodies = value
      update()
      break

    case 'toggle_run':
      isRunning = !isRunning
      if (isRunning) {
        update()
      }
      break

    case 'get_bodies':
      self.postMessage(bodies)
      break
  }
}

const update = () => {
  const length = bodies.length
  for (let i = 0; i < length; ++i) {
    let ax = 0
    let ay = 0

    for (let j = 0; j < length; ++j) {
      if (i === j) continue
      const coefficient = -bodies[j].mass * ((bodies[i].x - bodies[j].x) ** 2 + (bodies[i].y - bodies[j].y) ** 2) ** -1.5
      ax += coefficient * (bodies[i].x - bodies[j].x)
      ay += coefficient * (bodies[i].y - bodies[j].y)
    }

    bodies[i].vx += ax
    bodies[i].vy += ay
    bodies[i].x += bodies[i].vx
    bodies[i].y += bodies[i].vy
  }

  if (isRunning) {
    setTimeout(update)
  }
}

// vim: set ts=2 sw=2 et:
