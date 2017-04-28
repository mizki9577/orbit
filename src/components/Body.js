/* @flow */
import type { Body as BodyType } from '../types.js'
import React from 'react'
import { selectBody } from '../actions.js'

const Body = (props: BodyType) => (
  <circle r={ props.radius } cx={ props.x } cy={ props.y } style={{ fill: props.color }}
          onMouseDown={ ev => {
            ev.stopPropagation()
            selectBody(props.id)
          } } />
)

export default Body

// vim: set ts=2 sw=2 et:
