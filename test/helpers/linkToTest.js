describe('helpers/link-to', function() {
  before(function() {
    var rootNode = document.createElement('root-node');

    var ProfileModel = App.Model.extend({});

    var UserModel = App.Model.extend({
      relations: [{
        key: 'profile',
        relatedModel: ProfileModel,
        type: 'HasOne'
      }]
    });

    var UsersCollection = Backbone.Collection.extend({
      model: UserModel
    });

    var AppModel = App.Model.extend({
      relations: [{
        relatedModel: UserModel,
        collectionType: UsersCollection,
        type: 'HasMany',
        key: 'users',
        reverseRelation: { includeInJSON: 'id' }
      }]
    });

    this.view = new App.ApplicationView({
      el: rootNode,
      model: new AppModel({
        users: [{id: 1, profile: { id: 2, firstName: 'Christian' }}]
      })
    });
  });

  after(function() {
    delete App.Router;
    Backbone.history.handlers = [];
    App.Router = new App.ApplicationRouter;
  });

  beforeEach(function() {
    delete App.Router;
  });

  afterEach(function() {

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

  it('Should print contained text in innerHTML', function() {
    App.Router = new App.ApplicationRouter;
    this.view.template = Handlebars.compile('{{#link-to \'index\'}}Test string{{/link-to}}');
    this.view.render();
    expect(this.view.$('a').html()).to.equal('Test string');
  });

  it('Should resolve query params', function() {
    App.Router = new (App.ApplicationRouter.extend({
      routes: {
        'users': 'users',
        'users/:user_id': 'user',
        'users/:user_id/profile/:profile_id': 'user.profile'
      }
    }));

    this.view.template = Handlebars.compile([
      '{{#link-to \'users\'}}Users{{/link-to}}',
      '{{#link-to \'user\' model=\'users.0\'}}First User{{/link-to}}',
      '{{#link-to \'user.profile\' model=\'users.0\'}}First User\'s profile{{/link-to}}'
    ].join('\n'));

    expect(this.view.render().$('a').eq(0).attr('href')).to.equal('/users');
    expect(this.view.render().$('a').eq(1).attr('href')).to.equal('/users/1');
    expect(this.view.render().$('a').eq(2).attr('href')).to.equal('/users/1/profile/2');
  });

  it('should take remaining hash elements and pass them as attributes', function() {
    App.Router = new App.ApplicationRouter;
    this.view.template = Handlebars.compile('{{#link-to \'index\' class=\'foo\' id=\'bar\'}}Foo{{/link-to}}');
    this.view.render();
    expect(this.view.$('a').hasClass('foo')).to.be.true;
    expect(this.view.$('a')[0].id).to.equal('bar');
  });
});
