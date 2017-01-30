/* @flow */

import React from 'react'

import ControllWindow from './ControllWindow'
import BodyInformationWindow from './BodyInformationWindow'

const style = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap-reverse',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
}

const _Controlls = (
  <div style={ style }>
    <ControllWindow />
    <BodyInformationWindow />
  </div>
)

const Controlls = () => _Controlls

export default Controlls

// vim: set ts=2 sw=2 et:
