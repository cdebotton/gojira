describe('index', function() {
  before(function() {
    var root = document.createElement('div');
    root.id = 'app-root';
    this.index = new App.ApplicationView;
    this.index.setElement(root);
  });

  it('should exist', function() {
    expect(this.index).to.be.ok;
  });

  it('should have the `body` element assigned to the `el` property', function() {
    expect(this.index.$el).to.exist;
    expect(this.index.$el.is('div')).to.be(true);
    expect(this.index.$el).to.have.id('app-root');
  });
});
