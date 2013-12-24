'use strict';

module.exports = Handlebars.registerHelper('bind', function(attr, property, options) {
  var model = this._parentView.model;
  if (! model.has(property)) {
    throw 'Cannot bind property ' + property + '.';
  }
  var value = model.get(property);
  var str = [attr, '=', '"'+value+'"'].join('');

  return new Handlebars.SafeString(str);
});
