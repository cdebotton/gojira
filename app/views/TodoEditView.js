'use strict';

module.exports = App.TodoEditView = App.View.extend({
  model: App.TodoEditModel,

  template: require('templates/todo-edit'),

  className: 'todo-edit',

  events: {

  },

  initialize: function() {
    Backbone.Validation.bind(this);
  }
});
