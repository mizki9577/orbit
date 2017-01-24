/* @flow */

export type Body = {|
  id: number,
  locus: [number, number][],
  mass: number,
  radius: number,
  style: Object,
  vx: number,
  vy: number,
  x: number,
  y: number,
|}

export type Touch = {|
  id: number,
  x: number,
  y: number,
|}

export type State = {|
  bodies: Body[],
  centerX: number,
  centerY: number,
  followingBody: ?number,
  mousePressed: bool,
  mouseX: ?number,
  mouseY: ?number,
  scale: number,
  selectedBody: ?number,
  touches: Touch[],
  windowHeight: number,
  windowWidth: number,
|}

// vim: set ts=2 sw=2 et:
