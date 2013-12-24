"use strict";

/**
 * Create empty validation function.
 * @type {Backbone.Model}
 */
App.Model = Backbone.RelationalModel.extend({});

/**
 * Create reference shortcut to Object's hasOwnProperty.
 * @type {Boolean}
 */
var hasOwn = Object.prototype.hasOwnProperty;

  /**
   * Determine if a value is a number
   * @param  {*}  value Value to be tested
   * @return {Boolean}       True if value is a number.
   */
  var isNumber = function(value) {
    return _.isNumber(value) || (_.isString(value) && value.match(Backbone.Validation.patterns.number));
  };

/**
 * Determine if a property exists as a nested Backbone Model
 * @param  {Backbone.Model}  model     Parent model
 * @param  {string}  modelName Name of model to be tested
 * @return {Boolean}           True if model is a nested Backbone model
 */
var isNestedModel = function(model, modelName) {
  return model instanceof Backbone.Model &&
    model.attributes.hasOwnProperty(modelName) &&
    (model.attributes[modelName] instanceof Backbone.Model ||
    model.attributes[modelName] instanceof Backbone.Collection);
};

/**
 * Determine if a property exists within a Backbone Collection
 * @param  {Backbone.Collection}  collection Parent collection
 * @param  {int}  index      Index the model exists at within the collection
 * @return {Boolean}            True if the model at the provided index exists within the collection
 */
var isNestedCollection = function(collection, index) {
  return collection instanceof Backbone.Collection && isNumber(index) && collection.length >= index;
};

var instantiateRelated = function(model, next) {
  if (!(model instanceof Backbone.RelationalModel)) return null;
  var relations = model.getRelations(),
      relatedModels = _.pluck(relations, 'key'), key, model;
  if (relatedModels.length === 0 || (key = _.indexOf(relatedModels, next)) === -1) return null;
  model.attributes[next] = new relations[key].relatedModel;
  return model.get(next);
}

/**
 * Get nested model relationship through string with dot-syntax.
 * @param  {string} attr  String representation, ie. 'profile.first_name'
 * @param  {Backbone.Model} model The root model.
 * @return {object}       Object containing the model and lone attribute name.
 */
var getNested = function(attr, model) {
  var models, modelName;
  if (~_.indexOf(attr, '.')) {
    models = attr.split('.');
    if(isNumber(attr = models.pop())) {
      models.push(attr);
      attr = undefined;
    }
    model = _.reduce(models, function(model, next) {
      if (!model) return;
      if (isNestedModel(model, next)) return model.get(next);
      else if (isNestedCollection(model, next)) return model.at(next);
      else if (model.attributes[next] === null) return instantiateRelated(model, next);
    }, model, this);
  }
  return model !== void 0 ? { model: model, attr: attr } : false;
};

/**
 * Convert a model to flat dot-notation syntax for fast value lookups.
 * @param  {obj} obj    Object representation of model
 * @param  {obj} into   Resulting flattened object recursive passed into itself
 * @param  {prefix} prefix Prefix memo that builds out dot-notation of object properties.
 * @return {obj}        The into object that's returned.
 */
var flatten = function (obj, into, prefix) {
  into = into || {};
  prefix = prefix || '';

  _.each(obj, function(val, key) {
    if(obj.hasOwnProperty(key)) {
      if (val && typeof val === 'object' && !(val instanceof Date || val instanceof RegExp)) {
        flatten(val, into, prefix + key + '.');
      }
      else {
        into[prefix + key] = val;
      }
    }
  });

  return into;
};

_.extend(App.Model.prototype, {
  get: function(attr) {
    var seek = getNested(attr, this);
    if (seek.attr !== void 0) {
      return Backbone.RelationalModel.prototype.get.call(seek.model, seek.attr);
    }
    else {
      return seek.model;
    }
  },

  set: function(attr, value, options) {
    var model;
    if (!_.isObject(attr)) {
      var seek = getNested(attr, this);
      model = seek.model;
      var oldAttr = attr;
      attr = seek.attr;
      if (model !== void 0) {
        return Backbone.RelationalModel.prototype.set.call(model, attr, value, options);
      }
      else {
        return this;
      }
    }
    else {
      options = value;
      for (var i in attr) {
        App.Model.prototype.set.call(this, i, attr[i], options);
      }

      return this;
    }

  },

  has: function(attr) {
    var seek = getNested(attr, this);
    return Backbone.RelationalModel.prototype.has.call(seek.model, seek.attr);
  },

  unset: function(attr) {
    var seek = getNested(attr, this);
    return Backbone.RelationalModel.prototype.unset.call(seek.model, seek.attr);
  },

  sync: function(method, model, options) {
    var attrs = (options.attrs || flatten(model.toJSON()));
    this.set(attrs, {silent: true});
    return Backbone.sync.call(this, method, model, options);
  }
});
