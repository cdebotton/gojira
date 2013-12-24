module.exports = App.ApplicationView = App.View.extend({
  el: '#app-root',

  template: require('templates/application'),

  initialize: function() {
    Backbone.Validation.bind(this);
  }
});
