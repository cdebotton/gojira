'use strict';

module.exports = App.CompleteTodosView = App.View.extend({
  model: App.CompleteTodosModel,

  template: require('templates/complete-todos'),

  className: 'complete-todos',

  events: {

  },

  initialize: function() {
    Backbone.Validation.bind(this);
    this.listenTo(this.model.get('todos'), 'change', this.render);
  }
});
