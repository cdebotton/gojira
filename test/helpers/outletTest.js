describe('outlet-helper', function() {
  beforeEach(function() {
    this.view = new App.View;
  });

  it('should exist', function() {
    expect(typeof Handlebars.helpers['outlet']).to.equal('function');
  });

  it('should return an instance of Handlebars.SafeString', function() {
    expect(Handlebars.helpers['outlet']() instanceof Handlebars.SafeString).to.be.true;
  });

  it('should return an outlet named after the parent view cid.', function() {
    var cid = this.view.cid;
    this.view.template = Handlebars.compile('{{outlet}}');
    this.view.render();
    expect(this.view.el.innerHTML).to.equal('<div data-outlet-id="_' + cid +'-outlet"></div>');
  });

  it('should add a main outlet to the parent view when the outlet is added.', function() {
    var cid = this.view.cid;
    this.view.template = Handlebars.compile('{{outlet}}');
    this.view.render();
    expect(this.view.outlets.main).to.equal('_' + this.view.cid  + '-outlet');
  });
});
