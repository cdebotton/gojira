'use strict';

var App = require('config/app');
require('config/view');
require('config/utils');

var folderOrder = [
  'routers', 'models', 'collections', 'controllers',
  'templates', 'views', 'helpers'
  ];

folderOrder.forEach(function(folder) {
  window.require.list().filter(function(module) {
    return new RegExp('^' + folder + '/').test(module);
  }).forEach(function(module) {
    require(module);
  });
});

var app = new App.ApplicationView;
app.render();

Backbone.history.start({ pushState: true });