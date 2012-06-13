# Sinatra base app

This repository contains a set of Sinatra base apps containing the minimal boilerplate to start developing you very own Sinatra app.

## How to use

1. Clone the repository: `git clone https://www.github.com/rchampourlier/sinatra-baseapp.git`
2. Choose the branch you want to use: `git checkout bootstrap-backbone-mongo` for example
3. You can reset the git repository to start your own project: ...
4. Change the app name (say you want to call your app LovelyApp):
  - rename `app/base_app.rb` to `app/lovely_app.rb`
  - rename the app's class to `LovelyApp` instead of `BaseApp` within `app/lovely_app.rb`
  - update the app's class name within `config.ru` to `LovelyApp`
5. Run: `bundle exec rackup` should be enough!

## Common base

* Sinatra (currently 1.3.2)
* AssetPack, one of the best solution to package your assets with Sinatra (see `app/base_app.rb` for configuration)
* Bundler
* rspec
* Guard
  - allows us to restart Sinatra in development when the code is changed thanks to **guard-shotgun**
  - provides continuous-testing thanks to **guard-rspec**
* Packaged and included in `base_app.css` symbols webfont (Entypo). Just use the `symbol` CSS class on any element to use this font and show the cute symbols!

## Branches

Several branches are available with different boilerplates:

* **bootstrap-backbone-mongo**
  - Twitter Bootstrap for theming
  - Backbone for client MVC framework
  - MongoDB for database

## Configuration

### mongo

If you're using a MongoDB-backed boilerplate, have a look into `config/initializers/mongodb.rb` to configure your access to the MongoDB database.