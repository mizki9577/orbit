/* @flow */

export type Body = {|
  id: number,
  locus: [number, number][],
  mass: number,
  radius: number,
  color: string,
  vx: number,
  vy: number,
  x: number,
  y: number,
|}

export type State = {|
  bodies: Body[],
  touches: Touch[],

  newBody: ?Body,

  windowHeight: ?number,
  windowWidth: ?number,

  centerX: number,
  centerY: number,

  mouseX: ?number,
  mouseY: ?number,
  mousePressed: bool,

  mouseSvgX: ?number,
  mouseSvgY: ?number,

  scale: number,

  followingBodyId: ?number,
  selectedBodyId: ?number,

  isRunning: boolean,
  isFullscreen: ?boolean,
  showState: boolean,

  operationMode: string,

  loop: number,
|}

// vim: set ts=2 sw=2 et:
