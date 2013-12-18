exports.config = {
  files: {
    javascripts: {
      joinTo: {
        'javascripts/app.js': /^app/,
        'javascripts/vendor.js': /^bower_components/
      }
    },
    stylesheets: {
      joinTo: {
        'stylesheets/app.css': /^app/
      }
    },
    templates: {
      precompile: true,
      root: 'templates',
      paths: {
        jquery: 'bower_components/jquery/jquery.js',
        handlebars: 'bower_components/handlebars/handlebars.js',
        emblem: 'bower_components/emblem.js/emblem.js'
      },
      joinTo: {
        'javascripts/app.js': /^app/
      }
    }
  }
};
