'use strict';

describe('bind helper', function() {
  before(function() {
    delete App.Router;
    App.Router = new (App.ApplicationRouter.extend({
      routes: {
        'foo': 'bar'
      }
    }));
  });

  beforeEach(function() {
    this.view = new App.View({
      model: new App.Model({ foo: 'bar' })
    });
  });

  it('should create the appropriate DOM attributes', function() {
    this.view.template = Handlebars.compile("<a {{bind 'id' 'foo'}}>Link to foo</a>");
    this.view.render();
    expect(this.view.$('a').attr('id')).to.equal('bar');
  });

  it('should throw error when it can\'t find the property value.', function() {
    this.view.template = Handlebars.compile("<a {{bind 'id' 'doesntExist'}}>Link to foo</a>");
    expect(this.view.render.bind(this.view)).to.throw('Cannot bind property doesntExist.');
  });

  xit('should appropriately create links when href is provided', function() {
    this.view.template = Handlebars.compile("<a {{bind 'href' 'foo'}}>Link to foo</a>");
    this.view.render();
    expect(this.view.$('a').attr('href')).to.equal('/bar');
  });
});
