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
      joinTo: {
        'javascripts/app.js': /^app/
      }
    }
  }
};
