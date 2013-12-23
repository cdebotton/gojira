'use strict';

module.exports = Handlebars.registerHelper('link-to', function(target, context, options) {
  var values = _.values(App.Router.routes),
      keys = _.keys(App.Router.routes),
      reg = new RegExp('([^\/]+)/:([A-Za-z0-9_-]+)', 'ig'),
      mock, index;

  if (options === void 0) {
    options = context;
    context = _.extend({
      _parentView: this._parentView,
      _cid: this._parentView.model.cid
    }, this._parentView.model.toJSON());
  }

  mock = _.clone(context);
  delete mock._parentView;
  delete mock._cid;

  if ((index = _.indexOf(values, target)) > -1) {
    var route = keys[index],
        flat = App.Utils.flatten(mock);
    if (reg.exec(route)) {
      var queryParams = _.reduce(route.match(reg), function(memo, segment, index, matches) {
        var segment = segment.split('/'),
            key = segment[1];
        console.log(memo, '\n', key);
        return memo
      }, {
        objectPath: '',
        routePath: route
      });
    }
    var str = '<a href="/'+ route +'">' + options.fn() + '</a>';
    return str;
  }

  throw new Error('route: ' + target + ' does not exist.');
});
