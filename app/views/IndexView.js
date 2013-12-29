'use strict';

module.exports = App.IndexView = App.View.extend({
  model: App.IndexModel,

  template: require('templates/index'),

  className: 'index',

  outlet: 'main',

  events: {

  }
});
