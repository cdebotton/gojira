'use strict';

function transformProp(prop) {
  return (function() {
    switch(prop) {
      case 'class':
      case 'classNames':
      case 'classes':
        return 'className';
      default:
        return prop;
    }
  })();
}

module.exports = Handlebars.registerHelper('link-to', function(target, options) {
  var values = _.values(App.Router.routes),
      keys = _.keys(App.Router.routes),
      hash = Backbone.history._hasPushState ||
             !Backbone.history._wantsHashChange ?
             '/' : '/#/',
      index, model;
  options.hash = options.hash || {};

  if (options.hash.model) {
    model = this._parentView.model.get(options.hash.model);
    delete options.hash.model;
  }
  else {
    model = this._parentView.model;
  }

  if ((index = _.indexOf(values, target)) > -1) {
    var route = keys[index];
    var objectPath = _.reduce(target.split('.'), _.bind(function(memo, part, key, array) {
      var reg = new RegExp(':' + part +'_([^\/]+)', 'i'),
          matches = route.match(reg),
          path, property, localPath, value;
      if (! matches) {
        return array[0];
      }

      property = matches[1];

      if (key > 0) {
        memo.push(part);
        localPath = memo.join('.') + '.' + property;
        value = model.get(localPath);
        route = route.replace(reg, value);
      }
      else {
        value = model.get(property);
        route = route.replace(reg, value);
      }
      return memo;
    }, this), []);


    var attrs = [];
    var aId = _.uniqueId('a'),
        a = document.createElement('a');

    for (var i in options.hash) {
      a[transformProp(i)] = options.hash[i];
    };
    a.href = hash + route;

    a.addEventListener('click', _.bind(function(route, e) {
      Backbone.history.navigate(route, true);
      e.preventDefault();
    }, null, route));

    a.innerText = options.fn();
    this._parentView._toRender.push([aId, a]);

    App.Router.on('route', _.bind(function($a, target, route) {
      var $a = $(a);
      $a[route === target ? 'addClass' : 'removeClass']('active');
    }, this, a, target));

    return '<a id="_' + aId + '">waiting</a>';
  }

  throw new Error('route: ' + target + ' does not exist.');
});
