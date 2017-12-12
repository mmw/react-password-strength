module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname,
    filename: './dist/index.js',
    libraryTarget: 'umd',
    library: 'ReactPasswordStrength',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: /src/,
        query: {
          presets: ['react', 'es2015', 'stage-2'],
        },
      }, {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ],
      },
    ],
  },
  externals: {
    'react': 'react'
  },
  resolve: {
    extensions: ['.js'],
  },
};
