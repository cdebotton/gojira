'use strict';

var conditionalReg = /^is([A-Z][^:]+):/;

var getOutput = function(attr, property, model) {
  var value, conditions;;
  if (!conditionalReg.test(property)) {
    value = model.get(property);
  }
  else {
    conditions = property.split(':');
    property = property.match(conditionalReg)[1].toLowerCase();
    if (model.has(property) && !! model.get(property)) {
      value = conditions[1];
    }
    else {
      value = conditions[2];
    }
  }
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
  var model = this._parentView.model, value,
      isConditional = conditionalReg.test(property);

  if (!model.has(property) && !isConditional) {
    throw 'Cannot bind property ' + property + '.';
  }

  value = getOutput(attr, property, model);

  var wId = _.uniqueId('w'),
      dataTag = ['data-watch-' + attr, '=', '"'+wId+'"'].join(''),
      valueTag = [attr, '=', '"'+value+'"'].join(''),
      str = [valueTag, dataTag].join(' '),
      evt = 'change:' + (isConditional ? property.match(conditionalReg)[1].toLowerCase() : property);

  model.on(evt, _.bind(function(property, model, value) {
    this._parentView.$('['+dataTag+']').attr(attr, getOutput(attr, property, model));
  }, this, property));

  var updateModel = function(e) {
    value = e.target.value;
    model.set(property, value);
  };

  this._parentView.$el.on('change [' + dataTag + ']', updateModel);
  this._parentView.$el.on('keyup [' + dataTag + ']', updateModel);

  return new Handlebars.SafeString(str);
});
