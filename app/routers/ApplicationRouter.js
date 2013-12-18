module.exports = App.Router = new (Backbone.Router.extend({
  routes: {
    '': 'index',
    'about': 'about',
    'users/:user_id/profile/:profile_id': 'user.profile'
  }
}));
