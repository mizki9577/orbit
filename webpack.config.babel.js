import { DefinePlugin } from 'webpack'
import BabiliPlugin from 'babili-webpack-plugin'
import HtmlPlugin from 'html-webpack-plugin'
import path from 'path'

export default env => {
  const isDevelopment = env.development || !env.production
  const config = {}

  config.entry = {
    'main': './src/main.js',
    'bodyUpdater.worker': './src/actions/bodyUpdater.worker.js',
    'sw': './src/sw.js',
  }

  config.devtool = isDevelopment ? 'inline-source-map' : false

  config.output = {
    filename: '[name].bundle.js',
  }

  config.module = {}
  config.module.rules = [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    },

    {
      test: /\.css$/,
      exclude: /\.module\.css$/,
      use: [
        { loader: 'style-loader' },
        {
          loader: 'css-loader',
          options: {
            minimize: !isDevelopment,
            sourceMap: isDevelopment,
          },
        },
      ],
    },

    {
      test: /\.module\.css$/,
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

    {
      test: [
        /manifest\.json$/,
        /icon\.png$/,
      ],
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
    }
  ]

  config.plugins = [
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(!isDevelopment ? 'production' : 'development'),
      }
    }),

    new HtmlPlugin({
      template: './src/index.ejs',
      minify: isDevelopment ? false : {},
      chunks: ['main'],
      xhtml: true,
    }),
  ]

  if (!isDevelopment) {
    config.plugins.push(new BabiliPlugin(!isDevelopment))
  }

  config.devServer = {
    publicPath: '/orbit/',
    host: '0.0.0.0',
    port: 8080,
  }

  return config
}

// vim: set ts=2 sw=2 et:
