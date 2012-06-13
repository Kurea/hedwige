require 'sinatra/base'

module Sinatra
  module Partials
    def partial( page, variables={} )
      haml page.to_sym, {layout:false}, variables
    end
  end
  register Partials
end

