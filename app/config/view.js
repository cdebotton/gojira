'use strict';

var ViewHelper = {
  VERSION: '1.0.0',

  postponed: {},

  rendered: {},

  postponeRender: function(name, options, parentView) {
    var viewClass = _.inject((name || '').split('.'), function(memo, fragment) {
      return memo[fragment] || false;
    }, window);

    if (! viewClass) {
      throw('Invalid view name - ' + name + '.');
    }
    if (! options.hash.model) {
      options.hash.model = parentView.model;
    }
    else if(typeof options.hash.model === 'string') {
      options.hash.model = parentView.model.get(options.hash.model);
    }

    var view = new viewClass(options.hash);
    if (options.fn) {
      view.template = options.fn;
    }

    var cid = (parentView || options.data.view).cid;
    this.postponed[cid] = this.postponed[cid] || [];
    this.postponed[cid].push(view);

    return '<div id="_' + view.cid + '"></div>';
  },

  renderPostponed: function(parentView) {
    var cid = parentView.cid;
    this.rendered[cid] = _.map(this.postponed[parentView.cid], function(view) {
      view.render();
      parentView.$('#_' + view.cid).replaceWith(view.el);
      view.didInsertElement();
      return view;
    });
    parentView.didInsertChildElements();
    delete this.postponed[cid];
  },

  clearRendered: function(parentView) {
    var cid = parentView.cid;

    if (this.rendered[cid]) {
      _.invoke(this.rendered[cid], 'remove');
      delete this.rendered[cid];
    }
  }
};

Handlebars.registerHelper('view', function(name, options) {
  var view = ViewHelper.postponeRender(name, options, this._parentView);
  return new Handlebars.SafeString(view);
});

Handlebars.registerHelper('views', function(name, models, options) {
  var _parentView = this._parentView;
  var callback = function(model) {
    options.hash.model = model;
    ViewHelper.postponeRender(name, options, _parentView);
  };
  models = this._parentView.model.get(models).models;
  var markers = _.map(models, callback);

  return Handlebars.SafeString(markers.join(''));
});

var _compile = Handlebars.compile;
Handlebars.compile = function(template, options) {
  options = options || {};
  options.data = true;
  return _compile.call(this, template, options);
};

module.exports = App.View = Backbone.View.extend({
  constructor: function(options) {
    Backbone.View.call(this, options);
  }
});

App.View.prototype.renderTemplate = function(context) {
  context = context || {};
  ViewHelper.clearRendered(this);
  context = _.clone(context);
  context._parentView = this;
  this.$el.html(this.template(context, { data: { view: this } }));
  ViewHelper.renderPostponed(this);
  return this;
};

App.View.prototype.renderedSubViews = function() {
  return ViewHelper.rendered[this.cid];
};

var _remove = Backbone.View.prototype.remove;

App.View.prototype.remove = function() {
  ViewHelper.clearRendered(this);
  _remove.apply(this, arguments);
};

App.View.prototype.render = function() {
  if (this.template) {
    var data = typeof this.templateData === 'function' ? this.templateData() : this.templateData;
    this.renderTemplate(data);
  }
  return this;
};

App.View.prototype.templateData = function() {
  var ctx = this.model ? this.model.toJSON() : {};
  if (this.model) {
    ctx._cid = this.model.cid;
  }
  return ctx;
};

App.View.prototype.didInsertElement = function() {};

App.View.prototype.didInsertChildElements = function() {};
