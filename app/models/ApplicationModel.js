module.exports = App.ApplicationModel = App.Model.extend({
  relations: [

  ],

  validations: {
    title: { required: true }
  },

  defaults: {
    title: 'My Application'
  },

  initialize: function() {

  }
});
