'use strict';

module.exports = App.NavigationView = App.View.extend({
  template: require('templates/navigation'),
  templateData: function() {
    return {
      id: 1,
      profile: {
        id: 2,
        data: {
          id: 3
        }
      }
    }
  },
  className: 'navigation',

  events: {

  },

  initialize: function() {

  }
});
