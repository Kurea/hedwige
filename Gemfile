source "http://rubygems.org"

ruby '2.1.4'

gem 'bundler'

gem 'sinatra', :require => "sinatra/base"
gem 'thin'

gem 'haml'
gem 'sinatra-assetpack', :require => 'sinatra/assetpack'

# Parsing
gem 'json'
gem 'nokogiri'

# MongoDB
gem 'mongoid', '~> 3.0'
gem 'bson_ext'
gem 'activesupport'

group :development do
	gem 'ruby_gntp'
  gem 'guard'
  gem 'guard-bundler'
  gem 'guard-shotgun', :git => "https://github.com/rchampourlier/guard-shotgun.git", :branch => "master"
  gem 'guard-rspec'
  gem 'heroku'
end

group :development, :test do
  gem 'pry-rails'
  gem 'pry-byebug'
  gem 'pry-stack_explorer'
  gem 'pry-remote'
	gem 'rspec'
  gem 'rspec-instafail'
	gem 'rack-test'
end

