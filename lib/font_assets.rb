require 'sinatra/base'

module Sinatra

  # Source: https://github.com/colszowka/rack-fontserve/blob/master/lib/rack-fontserve.rb
  module FontAssets

    CONTENT_TYPES = {
      'ttf' => 'font/truetype',
      'otf' => 'font/opentype',
      'woff' => 'font/woff',
      'eot' => 'application/vnd.ms-fontobject',
      'svg' => 'image/svg+xml'
    }

    def not_found
      [404, '']
    end
    
    module Helpers
      def prepare_headers(format)
        set_content_type(format)
        set_cache
      end
      
      def set_content_type(format)
        headers['Content-Type'] = CONTENT_TYPES[format.to_s]
      end
      
      def set_cache
        headers 'Cache-Control' => "public, max-age=#{Rack::Fontserve.max_age}",
                'Expires' => (Time.now + Rack::Fontserve.max_age).httpdate,
                'Access-Control-Allow-Origin' => '*'
      end

      def format?(f)
        @font.formats.include?(f.to_s)
      end
    end

    def self.registered(app)
     
      app.helpers FontAssets::Helpers
      
      # Render the font file for given font and format with caching
      app.get '/font/:font_name.:format' do
        font_path = File.join(settings.root, 'assets', 'font', "#{params[:font_name]}.#{params[:format]}")
        if File.exist?(font_path)
          open(font_path).read
        else
          not_found
        end
      end

    end

  end

  register FontAssets
end