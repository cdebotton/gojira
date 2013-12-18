module.exports = App.ApplicationView = new (Backbone.View.extend({
  model: App.ApplicationModel,

  initialize: function() {
    console.log(this.model);
  }
}));
