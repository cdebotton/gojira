'use strict';

var getValue = function(attr, value) {
  switch(attr) {
    case 'href':
      var hash = Backbone.history._hasPushState ||
             !Backbone.history._wantsHashChange ?
             '/' : '#/';
          value = hash + value;
      break;
  }
  return value;
}

module.exports = Handlebars.registerHelper('bind', function(attr, property, options) {
  var model = this._parentView.model, value;

  if (! model.has(property)) {
    throw 'Cannot bind property ' + property + '.';
  }

  value = getValue(attr, model.get(property));

  var wId = _.uniqueId('w'),
      dataTag = ['data-watch-' + attr, '=', '"'+wId+'"'].join(''),
      valueTag = [attr, '=', '"'+value+'"'].join(''),
      str = [valueTag, dataTag].join(' ');

  model.on('change:' + property, _.bind(function(model, value) {
    this._parentView.$('['+dataTag+']').attr(attr, getValue(attr, value));
  }, this));

  var updateModel = function(e) {
    value = e.target.value;
    model.set(property, value);
  };

  this._parentView.$el.on('change [' + dataTag + ']', updateModel);
  this._parentView.$el.on('keyup [' + dataTag + ']', updateModel);

  return new Handlebars.SafeString(str);
});
