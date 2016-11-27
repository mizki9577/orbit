import uglify from 'rollup-plugin-uglify'
import replace from 'rollup-plugin-replace'

import config from './rollup.config.common.js'

config.plugins.push(
  replace({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
  uglify()
)

export default config

// vim: set ts=2 sw=2 et:
