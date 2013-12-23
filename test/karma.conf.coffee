module.exports = (config) ->
  config.set {
    basePath: '../'
    files: [
      'public/javascripts/vendor.js'
      'public/javascripts/app.js'

      'bower_components/chai/chai.js'
      'bower_components/sinonjs/sinon.js'

      'bower_components/chai-jquery/chai-jquery.js'
      'bower_components/chai-changes/chai-changes.js'
      'bower_components/chai-backbone/chai-backbone.js'
      'bower_components/sinon-chai/lib/sinon-chai.js'

      'test/**/*_test.(coffee|js)'
    ]

    port: '8080'
    runnerPort: 9100
    colors: yes
    logLevel: config.LOG_INFO
    autoWatch: no

    # Available browsers
    # Chrome
    # ChromeCanary
    # Firefox
    # Opera
    # Safari
    # PhantomJS
    browsers: ['PhantomJS']

    singleRun: yes

    preprocessors: '**/*.coffee': 'coffee'

    frameworks: ['mocha']

    plugins: [
      'karma-mocha'
      'karma-coffee-preprocessor'
      'karma-phantomjs-launcher'
      'karma-chrome-launcher'
      'karma-firefox-launcher'
      'karma-safari-launcher'
    ]
  }
