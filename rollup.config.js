import babel from 'rollup-plugin-babel'
import babili from 'rollup-plugin-babili'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import serve from 'rollup-plugin-serve'

const config = {
  entry: 'src/main.js',
  dest: 'public/bundle.js',
  format: 'es',

  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),

    nodeResolve({
      jsnext: true,
    }),

    commonjs({
      namedExports: {
        'node_modules/react/react.js': [ 'Component' ],
      },
    }),

    babel({
      presets: [
        [
          'env', {
            modules: false,
            targets: {
              browsers: 'last 1 versions',
            },
          },
        ],
        'react',
        'stage-0',
      ],
      plugins: [
        'external-helpers',
      ],
      env: {
        production: {
          minified: true,
          comments: false,
        },
      },
    }),
  ],
}


if (process.env.NODE_ENV === 'development') {
  config.plugins = [
    ...config.plugins,

    serve({
      contentBase: 'public',
    }),
  ]
} else if (process.env.NODE_ENV === 'production') {
  config.plugins = [
    ...config.plugins,

    babili(),
  ]
}

export default config

// vim: set ts=2 sw=2 et:
