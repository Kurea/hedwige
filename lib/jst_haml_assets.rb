require 'sinatra/base'

module Sinatra
  module JstHamlAssets

    module Helpers
      
      def not_found
        [404, 'JST Haml template not found']
      end

      def compile_jst_haml_template(name, path)
        string = File.open(path).read
        html = Haml::Engine.new(string, {:escape_attrs => false}).render
        %{
          define(function() {
            return function() {
              var c = {};
              if (!c[#{name.inspect}]) c[#{name.inspect}] = _.template(#{html.inspect});
              return c[#{name.inspect}].apply(this, arguments);
            }
          });
        }
      end
    end

    def self.registered(app)      

      app.helpers JstHamlAssets::Helpers

      app.get '/jst/:template_name.js' do
        content_type 'application/javascript'
  
        template_format = 'jst'
        template_name = params[:template_name]
        template_path = File.join(settings.root, 'views', 'templates', "#{template_name}.#{template_format}.haml")
        
        not_found

        if File.exist?(template_path)
          compile_jst_haml_template(template_name, template_path)
        else
          not_found
        end
      end
    end
  end

  register JstHamlAssets
end