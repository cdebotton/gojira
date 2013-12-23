module.exports = function(config) {
  config.set({
    basePath: '../',
    files: [
      'public/javascripts/vendor.js',
      'public/javascripts/app.js',
      'bower_components/chai/chai.js',
      'bower_components/sinonjs/sinon.js',
      'bower_components/chai-jquery/chai-jquery.js',
      'bower_components/chai-changes/chai-changes.js',
      'bower_components/chai-backbone/chai-backbone.js',
      'bower_components/sinon-chai/lib/sinon-chai.js',
      'test/helpers.js',
      'test/**/*Test.js'
    ],

    port: '8080',
    runnerPort: 9100,
    colors: true,
    logLevel: config.LOG_INFO,
    reporters: ['progress'],

    // Available browsers
    // Chrome
    // ChromeCanary
    // Firefox
    // Opera
    // Safari
    // PhantomJS
    browsers: ['PhantomJS'],

    singleRun: false,

    autoWatch: true,

    preprocessors: {
      'test/**/*.coffee': ['coffee']
    },

    frameworks: ['mocha'],

    plugins: [
      'karma-mocha',
      'karma-commonjs-preprocessor',
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-safari-launcher'
    ]
  })
};
