# What's in the box?!

## About
Written by [Christian de Botton](mailto:debotton@brooklynunited.com). The framework uses Backbone, Backbone-Relational, Backbone-Validation, jQuery, underscore, modernizr, Handlebars, Stylus, Nib, and Emblem. The testing suites use Karma, Mocha, Chai, and Sinon. The framework also provides scaffolding for rapid development.

## Dependencies
1. **[Node.js](http://nodejs.org)**
1. **brunch**: `sudo npm install -g brunch`
2. **scafolt**: `sudo npm install -g scaffolt`
3. **bower**: `sudo npm install -g bower`

## Scaffolding
Using scaffolt, you can rapidly create new components.

### Model
`scaffolt model user` will create `app/models/UserModel.js`. The model inherits from Backbone.RelationalModel and includes helpers written by the author to include dot syntax notation for getters and setters.

### Views
`scaffolt view user` will create `app/views/UserView.js` and `app/templates/user.emblem`. The view inherits helpers written by the author which allow for nested views from within the template syntax. These views will also automatically instantiate controllers for managing states.

### Collections
`scaffolt collection user` will create `app/collections/UsersCollection.js` and `app/models/UserModel.js`. The model will automatically be set as the model property for the collection.


### Templates
`scaffolt template user` will create `app/templates/user.emblem`. Use this to create templates that aren't directly tied to a view.

### Helpers
`scaffolt helper user-name` will create and register `app/helpers/user-info.js`.

### Routers
`scaffolt router users` will create `app/routers/UsersRouter.js`.

## Dependency Management
Bower files will be automatically included properly. The `app/initialize.js` file correctly manage the order in which files are ordered. String notation should be used in Backbone.Model relations so that the objects aren't required until initialization.

## Testing
Tests are run using the karma spec runner. The mocha+chai frameworks are used along with Sinon.js for server mocking.

To begin continuous testing with file watching, run `npm test`. All tests must be placed in the `test` folder following the file format of `test/*Test.js`. The framework is maintained through BDD testing, and the tests are included.

## Updating the framework.
It is possible to update the framework to match the latest files from the GitHub repo. Only system files will be replaced, leaving custom code untouched. For this reason, to make systematic changes, make a pull request to the original repository.

To update the framework, run `npm run update:framework`. This will pull the latest files and automatically run `npm update` and `bower update` for you.
