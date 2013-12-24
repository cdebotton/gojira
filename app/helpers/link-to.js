'use strict';

module.exports = Handlebars.registerHelper('link-to', function(target, options) {
  var values = _.values(App.Router.routes),
      keys = _.keys(App.Router.routes),
      index, model;

  if (options.hash && options.hash.model) {
    model = this._parentView.model.get(options.hash.model);
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


    return '<a href="/'+ route +'">' + options.fn() + '</a>';
  }

  throw new Error('route: ' + target + ' does not exist.');
});
