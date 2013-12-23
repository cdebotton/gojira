Index = require('views/ApplicationView');

describe('index', function() {
  before(function() {
    body = document.createElement('body');
    body.className = 'application';
    this.index = new Index;
    this.index.setElement('body');
  });

  it('should exist', function() {
    expect(this.index).to.be.ok;
  });

  it('should have the `body` element assigned to the `el` property', function() {
    expect(this.index.$el).to.exist;
    expect(this.index.$el.is('body')).to.be.true;
    expect(this.index.$el).to.have.class('application');
  });
});
