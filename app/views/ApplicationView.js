module.exports = App.ApplicationView = App.View.extend({
  model: App.ApplicationModel,

  el: '#app-root',

  template: require('templates/application'),

  initialize: function() {

  }
});
