/* @flow */
let bodies
let isRunning = false
let lastUpdate

self.onmessage = ({ data: { type, value } }) => {
  switch (type) {
    case 'init':
      bodies = value
      break

    case 'run':
      isRunning = true
      lastUpdate = performance.now()
      update()
      break

    case 'pause':
      isRunning = false
      break

    case 'get_bodies':
      self.postMessage(bodies)
      break
  }
}

const update = () => {
  const now = performance.now()
  const elapsed = (now - lastUpdate) * 60 / 1000
  lastUpdate = now

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

    bodies[i].vx += ax * elapsed
    bodies[i].vy += ay * elapsed
    bodies[i].x += bodies[i].vx * elapsed
    bodies[i].y += bodies[i].vy * elapsed
  }

  if (isRunning) {
    setTimeout(update)
  }
}

// vim: set ts=2 sw=2 et:
