'use strict';

module.exports = App.TodoView = App.View.extend({
  className: 'todo',

  events: {
    'click button': 'destroy'
  },

  initialize: function() {
    Backbone.Validation.bind(this);
    _.bindAll(this, 'destroy');
    this.listenTo(this.model, 'destroy', this.remove);
  },

  destroy: function(e) {
    e.preventDefault();
    this.model.destroy();
  }
});
