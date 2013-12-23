module.exports = App.Router = new (Backbone.Router.extend({
  routes: {
    '': 'index',
    'about': 'about',
    'users/:user_id/profile/:profile_id': 'user.profile'
  },

  constructor: function(options) {
    Backbone.Router.call(this, options);
    for (var i in this.routes) {
      this[this.routes[i]] = function() {};
    }
  }
}));
