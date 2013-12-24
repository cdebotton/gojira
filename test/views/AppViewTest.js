describe('AppView', function() {
  beforeEach(function() {
    this.view = new App.View();
  });

  it('should instantiate with a controller', function() {
    expect(this.view.controller).to.not.be.undefined;
  });

  it('should pass the controller into the render context.', function() {
    this.view.controller.set('dirty', true);
    this.view.template = Handlebars.compile('{{#if controller.dirty}}dirty{{/if}}');
    this.view.render();
    expect(this.view.el.innerHTML).to.equal('dirty');
  });
});
