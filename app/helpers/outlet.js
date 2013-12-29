'use strict';

module.exports = Handlebars.registerHelper('outlet', function(options) {
  var div = document.createElement('div'),
      name;

  if (this._parentView) {
    name =  '_' + this._parentView.cid + '-outlet'
    div.id = name;
    this._parentView.outlets['main'] = name;
  }

  return new Handlebars.SafeString(div.outerHTML);
});
