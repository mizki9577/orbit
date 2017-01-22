import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'

export default {
  entry: 'src/index.js',
  dest: 'public/bundle.js',
  format: 'es',

  plugins: [
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
        "react",
        "stage-0",
      ],
      plugins: [
        'external-helpers',
      ],
    }),
  ],
}

// vim: set ts=2 sw=2 et:
