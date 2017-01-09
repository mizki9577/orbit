/* @flow */

import React from 'react'

const ObjectTable = ({ obj, exclude={} }: { obj: Object, exclude: Object }) => (
  <table style={{ fontFamily: 'monospace' }}>
    <tbody>
      {
        Object.entries(obj).map(([k, v]) => (
          exclude[k] === null ? null :
          v === null ? null :
          <tr key={ k }>
            <th style={{ textAlign: 'right', paddingRight: '1em' }}>{ k }</th>
            <td>
            {
              typeof v === 'object' ? <ObjectTable obj={ v } exclude={ exclude[k] } />
              : typeof v === 'number' && !Number.isInteger(v) ? v.toPrecision(4)
              : String(v)
            }
            </td>
          </tr>
        ))
      }
    </tbody>
  </table>
)

export default ObjectTable

// vim: set ts=2 sw=2 et:
