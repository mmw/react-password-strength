module.exports = {
  entry: './example/index.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/example'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      include: [/example/, /dist/],
      loader: 'babel',
      query: {
        presets: ['es2015', 'react']
      }
    }]
  },
  resolve: {
    extensions: ['', '.js']
  }
}
