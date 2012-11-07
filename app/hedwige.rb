class Hedwige < Sinatra::Base
  
  set :root, File.dirname(__FILE__)
  set :haml, :escape_attrs => false

  enable    :logging, :dump_errors, :raise_errors
  helpers   Sinatra::Partials
  
  # Plugins
  register  Sinatra::AssetPack
  register  Sinatra::FontAssets
  register  Sinatra::JstHamlAssets

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
      '/css/hedwige.css',
      '/css/chosen.css'
    ]

    js :main, [
      '/js/vendor/require.min.js',
      '/js/hedwige.js'
    ]

    js_compression  :jsmin      # Optional
    css_compression :simple     # Optional
  }

  ##
  # App routes
  #

  get '/data/stage_references' do
    content_type :json
    Stage.references.to_json
  end

  # JSON data
  get '/data/stages/:key' do
    content_type :json
    File.open("data/#{params[:key]}.json").read
  end

  # All other URLs
  get '/*' do
    haml :home
  end
end