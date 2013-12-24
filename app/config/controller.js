module.exports = App.Controller;

App.Controller = function(attributes) {
  if (attributes && attributes.view) {
    this.view = attributes.view;
    delete attributes.view;
  }

  var attrs = attributes || {};
  this.cid = _.unique('c');
  this.attributes = {};
  attrs = _.defaults({}, attrs, _.result(this, 'defaults'));
  attrs.dirty = false;
  this.set(attrs);
  if (this.view && this.view.model) {
    this.view.model.on('change', _.bind(function() {
      this.set('dirty', true);
    }, this));

    this.view.model.on('sync', _.bind(function() {
      this.set('dirty', false);
    }, this));
  }
  this.initialize.apply(this, arguments);
};

App.Controller.defaults = {};
App.Controller.attributes = {};

App.Controller.extend = Backbone.Model.extend;
_.extend(App.Controller.prototype, Backbone.Events, {
  initialize: function () {},

  set: function(key, value, options) {
    if (typeof key === 'object') {
      options = value;
      for (var i in key) {
        var value = key[i];
        App.Controller.prototype.set.call(this, i, value, options);
      }
    }
    this.attributes[key] = value;
  },

  get: function(property, fallback) {
    if (this.has(property)) {
      return this.attributes[property];
    }
    this.attributes[property] = fallback;
    return fallback;
  },

  has: function(property) {
    if (this.attributes.hasOwnProperty(property)) {
      return true;
    }
    return false;
  },

  unset: function(property) {
    if (this.has(property)) {
      delete this.attributes[property];
    }
  }
});
