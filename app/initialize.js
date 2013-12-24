'use strict';

var App = require('framework/config/app');
require('framework/config/controller');
require('framework/config/model');
require('framework/config/view');
require('framework/config/utils');

var folderOrder = [
  'routers', 'models', 'collections', 'controllers',
  'templates', 'views','framework/helpers', 'helpers'
  ];

folderOrder.forEach(function(folder) {
  window.require.list().filter(function(module) {
    return new RegExp('^' + folder + '/').test(module);
  }).forEach(function(module) {
    require(module);
  });
});

App.Router = new App.ApplicationRouter;

var app = new App.ApplicationView({
  model: new App.ApplicationModel
});
app.render();

Backbone.history.start({ pushState: true });
module.exports = app;
