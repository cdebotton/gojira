'use strict';

module.exports = App.TodosView = App.View.extend({
  model: App.TodosModel,

  template: require('templates/todos'),

  className: 'todos',

  events: {

  },

  supports: {
    'todos.edit': 'App.TodoEditView'
  },

  initialize: function() {
    Backbone.Validation.bind(this);
  }
});
