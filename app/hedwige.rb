class Hedwige < Sinatra::Base
  
  set :root, File.dirname(__FILE__)
  set :haml, :escape_attrs => false

  enable    :logging, :dump_errors, :raise_errors
  helpers   Sinatra::Partials
  
  # Plugins
  register  Sinatra::AssetPack
  register  Sinatra::FontAssets

  ##
  # Home page
  #

  get '/' do
    haml :home
  end
  
  get '/stages/:id' do
    content_type :json
    File.open("data/#{params[:id]}.json").read
  end

  ##
  # Assets (through AssetPack)
  #

  assets {
    serve '/js',     from: 'assets/js'
    serve '/css',    from: 'assets/css'
    serve '/img',    from: 'assets/img'

    # The second parameter defines where the compressed version will be served.
    # (Note: that parameter is optional, AssetPack will figure it out.)
    #js :app, '/js/app.js', [
    #  '/js/vendor/**/*.js',
    #  '/js/app/**/*.js'
    #]

    css :main, [
      '/css/bootstrap.css',
      '/css/hedwige-base.css',
      '/css/bootstrap-responsive.css',
      '/css/hedwige.css'
    ]

    js :main, [
    	'/js/vendor/jquery.js',
    	'/js/vendor/underscore.js',
    	'/js/vendor/backbone.js',
    	'/js/vendor/bootstrap.js',
      '/js/vendor/showdown/src/showdown.js',
      '/js/hedwige.js'
    ]

    js_compression  :jsmin      # Optional
    css_compression :simple     # Optional
  }
end