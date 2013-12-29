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

App.instance = new App.ApplicationView({
  model: new App.ApplicationModel({
    todos: [{
      id: 1,
      task: 'sample todo',
      complete: true
    }, {
      id: 2,
      task: 'you can get rid of this',
      complete: false
    }]
  })
});

App.instance.render();

Backbone.history.start({ pushState: true });
module.exports = App.instance;
