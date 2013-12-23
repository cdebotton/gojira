describe('helpers/link-to', function() {
  beforeEach(function() {
    var rootNode = document.createElement('root-node');
    this.view = new App.ApplicationView({
      el: rootNode,
      model: new App.ApplicationModel
    });
    delete App.Router;
  });

  afterEach(function() {
    this.view.model.destroy();
    this.view.remove();
  });

  after(function() {
    delete App.Router;
    App.Router = new App.ApplicationRouter;
  });

  it('Should alias index to a root level URI.', function() {
    App.Router = new App.ApplicationRouter;
    this.view.template = Handlebars.compile('{{#link-to \'index\'}}Home{{/link-to}}');
    this.view.render();
    expect(this.view.$('a').attr('href')).to.equal('/');
  });

  it('Should throw an error if an undefined URL is passed.', function() {
    App.Router = new App.ApplicationRouter;
    this.view.template = Handlebars.compile('{{#link-to \'about\'}}About{{/link-to}}');
    expect(this.view.render.bind(this.view)).to.throw('route: about does not exist.');
  });

  it('Should resolve static routes.', function() {
    App.Router = new (App.ApplicationRouter.extend({
      routes: { 'about': 'about' }
    }));
    this.view.template = Handlebars.compile('{{#link-to \'about\'}}About{{/link-to}}');
    expect(this.view.render().$('a').attr('href')).to.equal('/about');
  });
});
