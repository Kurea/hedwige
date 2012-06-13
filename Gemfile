source "http://rubygems.org"

gem 'sinatra', :require => "sinatra/base"
gem 'thin'

gem 'haml'
gem 'sinatra-assetpack', :require => 'sinatra/assetpack'

# Parsing
gem 'json'
gem 'nokogiri'

# MongoDB
gem 'mongoid'
gem 'bson_ext'
gem 'activesupport'

group :development do
	gem 'ruby_gntp'
  gem 'guard'
  #gem 'guard-bundler'
  gem 'guard-shotgun', :git => "git@github.com:rchampourlier/guard-shotgun.git", :branch => "master"
  gem 'guard-rspec'
  gem 'heroku'
end

group :development, :test do
	gem 'rspec'
  gem 'rspec-instafail'
	gem 'rack-test'
end

