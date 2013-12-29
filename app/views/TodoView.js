'use strict';

module.exports = App.TodoView = App.View.extend({
  model: App.TodoModel,

  className: 'todo',

  events: {

  },

  initialize: function() {
    Backbone.Validation.bind(this);
  }
});
