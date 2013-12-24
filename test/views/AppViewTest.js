describe('AppView', function() {
  beforeEach(function() {
    this.view = new App.View;
  });

  it('should instantiate with a controller', function() {
    expect(this.view.controller).to.not.be.undefined;
  });
});
