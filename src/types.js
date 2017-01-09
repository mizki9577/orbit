export type Body = {
  id: number,
  mass: number,
  radius: number,
  x: number,
  y: number,
  vx: number,
  vy: number,
  locus: [number, number][],
  style: Object,
}

export type State = {
  windowWidth: number,
  windowHeight: number,
  mouseX: ?number,
  mouseY: ?number,
  mousePressed: bool,
  bodies: Body[],
}

// vim: set ts=2 sw=2 et:
