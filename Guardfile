guard 'bundler' do
  watch('Gemfile')
end

guard 'shotgun' do
  watch(%r{^(app|assets|lib|config)/(.)*.(rb|css|js|haml)})
end

#guard 'rspec', :version => 2, :cli => "--color --format nested --require spec_helper" do
#  watch(%r{^spec/(.+)_spec\.rb$})	{ |m| "spec/#{m[1]}_spec.rb" }
#  watch(%r{^config/boot\.rb$})		{ "spec" }
#  watch(%r{^app/(.+)\.rb$})     	{ "spec/app" }
#  watch(%r{^lib/(.+)\.rb$})     	{ "spec/lib" }
#  watch('spec/spec_helper.rb')  	{ "spec" }
#end
