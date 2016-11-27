import replace from 'rollup-plugin-replace'
import serve from 'rollup-plugin-serve'

import config from './rollup.config.common.js'

config.plugins.push(
  replace({
    'process.env.NODE_ENV': JSON.stringify('development'),
  }),
  serve({
    contentBase: 'public',
  })
)

export default config

// vim: set ts=2 sw=2 et:
