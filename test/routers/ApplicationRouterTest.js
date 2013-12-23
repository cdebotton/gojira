describe('ApplicationRouter', function() {
  before(function() {
    this.main = App.Router;
  });

  it('should exist', function() {
    expect(this.main).to.be.ok;
  });

  it('should route to `index` when navigation to /', function() {
    expect('/').to.route.to(this.main, 'index', {
      arguments: []
    });
  });
});
