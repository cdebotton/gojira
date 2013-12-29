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
    _.extend(options.hash, {
      parentView: parentView
    });
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
      view.render.call(view);
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
    return ViewHelper.postponeRender(name, options, _parentView);
  };
  models = this._parentView.model.get(models).models;
  var markers = _.map(models, callback);
  return new Handlebars.SafeString(markers.join(''));
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
    if (options && options.controller) {
      this.controller = options.controller;
      this.controller.view = this;
      delete options.controller;
    }
    else {
      this.controller = new App.Controller({
        view: this
      });
    }

    if (options && options.parentView) {
      this.parent = options.parentView;
      delete options.parent;
    }

    if (typeof this.role === 'string') {
      this.$el.attr('role', this.role);
    }
    this._toRender = [];
    this.outlets = {};
    if (this.supports instanceof Object) {
      this._childViews = _.map(_.pairs(this.supports), function(pair, key) {
        var className = pair[1],
            route = pair[0];
        var viewClass = _.inject((className || '').split('.'), function(memo, fragment) {
          return memo[fragment] || false;
        }, window);
        if (! viewClass) {
          throw new Error('Supported child view ' + className + ' does not exist.');
        }
        viewClass.prototype.parent = this;
        viewClass.prototype._outletRoot = '_' + this.cid;
        viewClass.prototype.model = viewClass.prototype.model || this.model;
        var view = new viewClass;
        view.listenTo(App.Router, 'route', _.bind(function(target, route) {
          if (target === route) this.render();
          else this.$el.remove();
        }, view, route));
        return view;
      }, this);
    }
  }
});

App.View.prototype.renderTemplate = function(context) {
  var outlet, html
  context = context || {};
  ViewHelper.clearRendered(this);
  context = _.clone(context);
  context._parentView = this;
  outlet = this.getOutlet();
  html = this.template(context, { data: { view: this } });
  this.$el.html(html);
  if (outlet) {
    this.$el.attr('data-id-outlet', '_' + this.parent.cid + '-outlet');
    this.parent.$(outlet).append(this.el);
  }
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
  _.each(this._toRender, _.bind(function(item, key) {
    this.$('#_' + item[0]).replaceWith(item[1]);
  }, this));
  this._toRender = [];

  return this;
};

App.View.prototype.templateData = function() {
  var ctx = this.model ? this.model.toJSON() : {};
  if (this.model) {
    ctx._cid = this.model.cid;
  }
  if (this.controller) {
    _.extend(ctx, { controller: this.controller.toJSON() });
  }
  return ctx;
};

App.View.prototype.getOutlet = function(str) {
  var outlet = str || this.outlet || false;
  if (!outlet) return false;

  return '[data-outlet-id="_' + this.parent.cid + '-outlet"]';
};

App.View.prototype.didInsertElement = function() {};

App.View.prototype.didInsertChildElements = function() {};
