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
    files: ['test/*.js'],
    exclude: [],

    browsers: ['PhantomJS'],
    frameworks: ['jasmine'],
    reporters: ['spec'],
    preprocessors: {
      './test/*.js': 'webpack'
    },

    webpack: {
      module: {
        loaders: [
          {
            test: /\.js$/,
            include: [/src/, /test/],
            loader: 'babel',
            query: {
              presets: ['es2015', 'react']
            }
          }, {
            test: /\.css$/,
            loader: "style-loader!css-loader"
          }
        ]
      }
    },
    webpackMiddleware: {
      state: 'errors-only'
    }
  })
}
