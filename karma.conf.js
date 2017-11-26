// Karma configuration

module.exports = function(config) {
  config.set({
    autoWatch: false,
    colors: true,
    concurrency: Infinity,
    logLevel: config.LOG_INFO,
    port: 9876,
    singleRun: true,

    basePath: '',
    files: [
      'node_modules/es6-shim/es6-shim.js',
      'test/*.js',
    ],
    exclude: [],

    browsers: ['PhantomJS'],
    frameworks: ['jasmine'],
    reporters: ['spec'],
    preprocessors: {
      './test/*.js': 'webpack'
    },

    webpack: {
      entry: './src/index.js',
      module: {
        rules: [
          {
            test: /\.js$/,
            include: [/src/, /test/],
            loader: 'babel-loader',
            query: {
              presets: ['react', 'es2015', 'stage-2'],
            },
          }, {
            test: /\.css$/,
            use: ["style-loader", "css-loader"],
          },
        ],
      },
    },
    webpackMiddleware: {
      state: 'errors-only'
    }
  })
}
