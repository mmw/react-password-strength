module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname,
    filename: './dist/index.js',
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
        loader: "style-loader!css-loader"
      }
    ]
  },
  externals: {
    'react': 'react'
  }
}
