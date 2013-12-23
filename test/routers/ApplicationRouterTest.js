describe('ApplicationRouter', function() {
  before(function() {
    this.main = require('routers/ApplicationRouter');
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
