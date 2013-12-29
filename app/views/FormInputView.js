'use strict';

module.exports = App.FormInputView = App.View.extend({
  model: App.FormInputModel,

  className: 'form-input',

  events: {
    'change': 'update'
  },

  initialize: function(options) {
    _.bindAll(this, 'update', 'updateCheckbox');
    this.$el.attr('type', options.type);
    this.type = options.type;
    this.bind = options.bind;
    if (options.bind) {
      var evt = 'change:' + options.bind;
      switch(options.type) {
        case 'checkbox':
          this.listenTo(this.model, evt, this.updateCheckbox);
          this.updateCheckbox(this, this.model.get(this.bind));
          break;
      }
    }
    Backbone.Validation.bind(this);
  },

  update: function(e) {
    switch(this.type) {
      case 'checkbox':
        this.model.set(this.bind, this.$el.is(':checked'));
        break;
    }
  },

  updateCheckbox: function(model, value) {
    if(!! value) {
      this.$el.attr('checked', true);
    }
    else {
      this.$el.removeAttr('checked');
    }
  }
});
