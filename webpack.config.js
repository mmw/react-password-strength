module.exports = {
  entry: './example/index.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/example',
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      include: /example/,
      query: {
        presets: ['react', 'es2015', 'stage-2'],
      },
    }],
  },
  resolve: {
    extensions: ['.js'],
  },
}
