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

  mutators: {
    completed: function() {
      return this.get('todos').filter(function(model) {
        return model.get('complete');
      }).length;
    }
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
