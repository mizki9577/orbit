/* @flow */

import dispatcher from './dispatcher'

export const update = () => {
  dispatcher.dispatch({
    type: 'update',
  })
}

// vim: set ts=2 sw=2 et:
