'use strict';

module.exports = App.TodosView = App.View.extend({
  model: App.TodosModel,

  template: require('templates/todos'),

  className: 'todos',

  events: {

  },

  initialize: function() {
    Backbone.Validation.bind(this);
  }
});
