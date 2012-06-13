class BaseApp < Sinatra::Base
  
  set :root, File.dirname(__FILE__)
  enable    :logging, :dump_errors, :raise_errors
  helpers   Sinatra::Partials
  register  Sinatra::AssetPack
  register  Sinatra::FontAssets

  ##
  # Home page
  #

  get '/' do
    haml :home
  end
  

  ##
  # Assets (through AssetPack)
  #

  assets {
    serve '/js',     from: 'assets/js'
    serve '/css',    from: 'assets/css'
    serve '/images', from: 'assets/img'

    # The second parameter defines where the compressed version will be served.
    # (Note: that parameter is optional, AssetPack will figure it out.)
    #js :app, '/js/app.js', [
    #  '/js/vendor/**/*.js',
    #  '/js/app/**/*.js'
    #]

    css :main, [
      '/css/bootstrap.css',
      '/css/bootstrap-responsive.css',
      '/css/base_app.css'
    ]

    js :main, [
    	'/js/jquery.js',
    	'/js/underscore.js',
    	'/js/backbone.js',
    	'/js/bootstrap.js',
      '/js/base_app.js'
    ]

    js_compression  :jsmin      # Optional
    css_compression :simple     # Optional
  }
end