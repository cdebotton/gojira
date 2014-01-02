'use strict';

describe('App.Model', function() {
  before(function() {
    this.server = sinon.fakeServer.create();
    this.server.respondWith('POST', '/', [200, { "Content-Type": "application/json" },'{"foo":"bar"}']);
  });

  beforeEach(function() {
    var Model = App.Model.extend({
      url: function() { return '/'; },
    });

    this.model = new Model({
      original: true
    });
  });

  it('should have a markToRevert method', function() {
    expect(typeof this.model.markToRevert).to.equal('function');
  });

  it('should instantiate with a _revertAttributes property that is a clone of the attributes property', function() {
    console.log(this.model.attributes, this.model._revertAttributes);
    expect(_.isEqual(this.model.attributes, this.model._revertAttributes)).to.be.true;
  });

  it('should have a revert method', function() {
    expect(typeof this.model.revert).to.equal('function');
  });

  it('should restore attributes when revert is invoked', function() {
    var original = _.clone(this.model.attributes);
    this.model.set('foo', 'bar');
    this.model.set('bar', 'baz');
    expect(this.model.get('foo')).to.equal('bar');
    expect(this.model.get('bar')).to.equal('baz');
    this.model.revert();
    expect(_.isEqual(this.model.attributes, original)).to.be.true;
  });

  it('should update revert attributes when sync\'d', function(done) {
    var original = _.clone(this.model.attributes);
    this.model.set('foo', 'bar');
    expect(this.model.get('foo')).to.equal('bar');
    this.model.save(null, {
      success: _.bind(function() {
        expect(_.isEqual(this.model.attributes, this.model._revertAttributes)).to.be.true;
        done();
      }, this)
    });
    this.server.requests[0].respond(200, {"Content-Type": "application/json"}, '{"foo":"bar"}');
  });
});
