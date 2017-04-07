import { DefinePlugin } from 'webpack'
import BabiliPlugin from 'babili-webpack-plugin'
import path from 'path'

export default env => {
  const isDevelopment = env.development || !env.production
  const config = {}

  config.entry = './src/main.js'
  config.devtool = isDevelopment ? 'inline-source-map' : false

  config.output = {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  }

  config.module = {}
  config.module.rules = [
    {
      test: /\.js$/,
      loader: 'babel-loader'
    },

    {
      test: /\.css$/,
      use: [
        { loader: 'style-loader' },
        {
          loader: 'css-loader',
          options: {
            modules: true,
            minimize: !isDevelopment,
            sourceMap: isDevelopment,
          },
        },
      ],
    },
  ]

  config.plugins = []
  config.plugins.push(
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(!isDevelopment ? 'production' : 'development'),
      }
    })
  )

  if (!isDevelopment) {
    config.plugins.push(new BabiliPlugin(!isDevelopment))
  }

  config.devServer = {
    contentBase: path.join(__dirname, 'public'),
    host: '0.0.0.0',
    port: 8080,
  }

  return config
}

// vim: set ts=2 sw=2 et:
