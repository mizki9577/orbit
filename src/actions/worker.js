/* @flow */
self.onmessage = ({ data }) => {
  const bodies = data

  const result = bodies.map(self => {
    let ax = 0
    let ay = 0

    for (const other of bodies) {
      if (self === other) continue
      const coefficient = -other.mass * ((self.x - other.x) ** 2 + (self.y - other.y) ** 2) ** -1.5
      ax += coefficient * (self.x - other.x)
      ay += coefficient * (self.y - other.y)
    }

    const vx = self.vx + ax
    const vy = self.vy + ay
    const x = self.x + vx
    const y = self.y + vy

    //const locus = [[self.x, self.y], ...self.locus]
    const locus = []
    return { ...self, x, y, vx, vy, locus }
  })

  postMessage(result)
}

// vim: set ts=2 sw=2 et:
