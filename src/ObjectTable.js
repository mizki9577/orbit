/* @flow */

import React from 'react'

const ObjectTable = ({ obj, exclude={}, style={ fontFamily: 'monospace' } }: { obj: Object, exclude: Object, style?: Object }) => (
  <table style={ style }>
    <tbody>
      {
        Object.entries(obj).map(([k, v]) => (
          exclude[k] === null ? null :
          v === null ? null :
          <tr key={ k }>
            <th>{ k }</th>
            <td>{ typeof v === 'object' ? <ObjectTable obj={ v } exclude={ exclude[k] } /> : String(v) }</td>
          </tr>
        ))
      }
    </tbody>
  </table>
)

export default ObjectTable

// vim: set ts=2 sw=2 et:
