'use strict';

describe('Controllers', function() {
  beforeEach(function() {
    this.controller = new App.Controller;
    this.server = sinon.fakeServer.create();
    this.server.respondWith('POST', '/fake', [200, { "Content-Type": "application/json" },'{"foo":"bar"}']);
    this.eventSpy = sinon.spy();
  });

  afterEach(function() {
    this.server.restore();
  });

  it('should exist', function() {
    expect(App.Controller).to.not.be.undefined;
  });

  it('should have an attributes hash', function() {
    expect(this.controller.attributes).to.be.a('object');
  });

  it('should be able to set a single property', function() {
    this.controller.set('foo', 'bar');
    expect(this.controller.attributes['foo']).to.equal('bar');
  });

  it('should be able to set a property hash', function () {
    this.controller.set({
      foo: 'bar',
      bar: 'baz'
    });

    expect(this.controller.attributes['foo']).to.equal('bar');
    expect(this.controller.attributes['bar']).to.equal('baz');
  });

  it('should check if the controller has a property', function() {
    this.controller.attributes['foo'] = 'bar';
    expect(this.controller.has('foo')).to.be.true;
    expect(this.controller.has('bar')).to.be.false;
  });

  it('should be able to get properties', function() {
    this.controller.attributes['foo'] = 'bar';
    expect(this.controller.get('foo')).to.equal('bar');
  });

  it('should return fallback property if get fails', function() {
    expect(this.controller.get('foo', 'bar')).to.equal('bar');
  });

  it('should be able to unset properties', function () {
    this.controller.set('foo', 'bar');
    expect(this.controller.get('foo')).to.equal('bar');
    this.controller.unset('foo');
    expect(this.controller.get('foo')).to.be.undefined;
  });

  it('should instantiate with a false dirty property', function() {
    expect(this.controller.get('dirty')).to.be.false;
  });

  it('should be dirty when model is changed', function() {
    var view = new App.View({ model: new App.Model });
    expect(view.controller.get('dirty')).to.be.false;
    view.model.set('foo', 'bar');
    expect(view.controller.get('dirty')).to.be.true;
  });

  it('should not be dirty when the model is synced', function() {
    var view = new App.View({ model: new App.Model });
    view.model.url = '/fake';
    view.model.on('sync', this.eventSpy);
    view.model.set('foo', 'bar');
    expect(view.controller.get('dirty')).to.be.true;
    view.model.save();
    expect(view.controller.get('dirty')).to.be.false;
  });
});
