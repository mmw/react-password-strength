var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname,
    filename: './dist/universal.js',
    libraryTarget: 'umd',
    library: 'ReactPasswordStrength'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: /src/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('./dist/style.css'),
  ],
  externals: {
    'react': 'react'
  }
}
