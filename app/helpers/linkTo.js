'use strict';

module.exports = Handlebars.registerHelper('linkTo', function(target, context, options) {
  var values = _.values(App.Router.routes),
      keys = _.keys(App.Router.routes),
      reg = new RegExp('([^\/]+)/:([A-Za-z0-9_-]+)', 'ig'),
      index;

  if ((index = _.indexOf(values, target)) > -1) {
    var route = keys[index],
        parsed = target;
    if (reg.exec(route)) {
      var params = route.match(reg),
          mock = _.clone(context),
          path = target.split('.'),
          flat;
      var base = path[0] + '_' + params[1].match('[^_]+$')[1];
      delete mock._parentView;
      flat = App.Utils.flatten(mock);
      console.log(base);
      parsed = _.reduce(params, function(memo, segment, index, parsed) {
        var split = segment.split('/'),
            toReplace = split[1].match(/(:.+)/)[1],
            exp = new RegExp(toReplace),
            value = 'test';

        console.log(flat);
        return memo.replace(exp, value);
      }, route);

      console.log(parsed);
    }
    var str = '<a href="/'+ parsed +'">' + options.fn() + '</a>';
    return str;
  }

  throw('route: ' + target + ' does not exist.');
});
