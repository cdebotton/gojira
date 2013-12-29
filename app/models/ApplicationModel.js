module.exports = App.ApplicationModel = App.Model.extend({
  relations: [{
    type            : 'HasMany',
    relatedModel    : 'TodoModel',
    collectionType  : 'TodosCollection',
    key             : 'todos',
    reverseRelation : { includeInJSON: 'id' }
  }],

  defaults: {
    todos: []
  },

  validations: {
    title: { required: true }
  },

  defaults: {
    title: 'My Application'
  },

  initialize: function() {

  }
});
