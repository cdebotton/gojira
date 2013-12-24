'use strict';

module.exports = Handlebars.registerHelper('log', function(param, options) {
  console.log(param);
});
