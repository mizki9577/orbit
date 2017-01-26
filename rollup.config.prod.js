import babili from 'rollup-plugin-babili'
import replace from 'rollup-plugin-replace'

import config from './rollup.config.common.js'

config.plugins = [
  ...config.plugins,
  babili(),
  replace({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
]

export default config

// vim: set ts=2 sw=2 et:
