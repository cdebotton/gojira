'use strict';

module.exports = Handlebars.registerHelper('outlet', function(options) {
  var name, str;

  if (this._parentView) {
    name =  '_' + this._parentView.cid + '-outlet'
    this._parentView.outlets['main'] = name;
  }

  str = '<div data-outlet-id="' + name + '"></div>';

  return new Handlebars.SafeString(str);
});
