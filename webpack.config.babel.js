export default {
  entry: './src/index.js',
  output: {
    path: './build/',
    filename: 'bundle.js',
  },

  devtool: '#inline-source-map',

  devServer: {
    contentBase: './public/',
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader',
      },
    ],
  },

  plugins: [
  ],
}

// vim: set ts=2 sw=2 et:
