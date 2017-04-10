/* @flow */
let bodies = []
let lastUpdate = 0
let intervalId = null

self.onmessage = ({ data: { type, value } }) => {
  switch (type) {
    case 'init':
      bodies = value
      break

    case 'run':
      lastUpdate = performance.now()
      intervalId = self.setInterval(update)
      break

    case 'pause':
      self.clearInterval(intervalId)
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
}

// vim: set ts=2 sw=2 et: