'use strict';

var App = require('config/app');
require('config/view');

var folderOrder = [
  'routers', 'models', 'collections', 'controllers',
  'views', 'helpers', 'templates'
  ];

folderOrder.forEach(function(folder) {
  window.require.list().filter(function(module) {
    return new RegExp('^' + folder + '/').test(module);
  }).forEach(function(module) {
    require(module);
  });
});

App.ApplicationView.render();
Backbone.history.start({ pushState: true });
