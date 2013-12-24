'use strict';

describe('bind helper', function() {
  before(function() {
    delete App.Router;
    App.Router = new (App.ApplicationRouter.extend({
      routes: {
        'foo': 'bar',
        'foo2': 'bar2'
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

  it('should appropriately create links when href is provided', function() {
    this.view.template = Handlebars.compile("<a {{bind 'href' 'foo'}}>Link to foo</a>");
    this.view.render();
    expect(this.view.$('a').attr('href')).to.equal('/bar');
  });

  it('should update the attribute when model is updated.', function() {
    this.view.template = Handlebars.compile("<a {{bind 'href' 'foo'}}>Link to foo</a>");
    this.view.render();
    expect(this.view.$('a').attr('href')).to.equal('/bar');
    this.view.model.set('foo', 'bar2');
    expect(this.view.$('a').attr('href')).to.equal('/bar2');
  });

  it('should update the model when the user enters input', function() {
    this.view.template = Handlebars.compile('<input type="text" {{bind \'value\' \'foo\' }}>');
    this.view.render();
    this.view.$('input').val('test');
    this.view.$('input').trigger('keyup');
    expect(this.view.model.get('foo')).to.equal('test');
  });

  it('should be able to bind a two sided toggle', function() {
    this.view.template = Handlebars.compile('<button type="button" {{bind \'class\' \'foo:bar:baz\'}}>Link</button>');
    this.view.model.unset('foo');
    this.view.render();
    expect(this.view.$('button').attr('class')).to.equal('baz');
    this.view.model.set('foo', true);
    expect(this.view.$('button').attr('class')).to.equal('bar');
    this.view.model.set('foo', false);
    expect(this.view.$('button').attr('class')).to.equal('baz');
  });
});
