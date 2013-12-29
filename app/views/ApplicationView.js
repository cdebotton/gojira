module.exports = App.ApplicationView = App.View.extend({
  el: '#app-root',

  template: require('templates/application'),

  supports: {
    'index': 'App.IndexView',
    'about': 'App.AboutView'
  },

  initialize: function() {
    Backbone.Validation.bind(this);
  }
});
