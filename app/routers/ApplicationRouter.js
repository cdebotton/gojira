module.exports = App.ApplicationRouter = Backbone.Router.extend({
  routes: {
    ''                      : 'index',
    'about'                 : 'about',
    'todo/:todo_id'        : 'todo.edit',
    'todo/:todo_id/delete' : 'todo.delete'
  },

  constructor: function(options) {
    Backbone.Router.call(this, options);
    for (var i in this.routes) {
      this[this.routes[i]] = function() {};
    }
  }
});
