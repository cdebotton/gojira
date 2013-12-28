'use strict';

module.exports = App.NavigationView = App.View.extend({
  model: App.NavigationModel,

  template: require('templates/navigation'),

  className: 'navbar navbar-default navbar-fixed-top',

  role: 'navigation',

  events: {

  },

  initialize: function() {
    Backbone.Validation.bind(this);
  }
});
