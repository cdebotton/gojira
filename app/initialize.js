'use strict';

var App = window.App = require('config/app');

var folderOrder = [
  'models', 'collections', 'controllers',
  'views', 'helpers', 'templates', 'routers'
  ];

folderOrder.forEach(function(folder) {
  window.require.list().filter(function(module) {
    return new RegExp('^' + folder + '/').test(module);
  }).forEach(function(module) {
    require(module);
  });
});

Backbone.history.start({ pushState: true });
