import { DefinePlugin } from 'webpack'
import BabiliPlugin from 'babili-webpack-plugin'
import path from 'path'

export default env => ({
  entry: './src/main.js',
  devtool: env.development ? 'eval-source-map' : false,

  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
    ],
  },

  plugins: [
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env.production ? 'production' : 'development'),
    }),

    new BabiliPlugin(env.production),
  ],

  devServer: {
    contentBase: path.join(__dirname, 'public'),
    host: '0.0.0.0',
    port: 8080,
  },
})

// vim: set ts=2 sw=2 et:
