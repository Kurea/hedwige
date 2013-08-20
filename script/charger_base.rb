# A lancer dans la console avec load './script/charger_base.rb'

puts "Database loading..."
# vider la base
Stage.delete_all

# parcourir le repertoire des json
directory = File.join(File.expand_path('../../', __FILE__), 'data/')

Dir.foreach(directory) {|file| 
 file_with_path =  File.join(directory, file)

 if (File.extname(file) == ".json")
  # pour chaque json
  stage = JSON.parse(File.read(file_with_path))
  stage = Stage.new(stage)
  if (stage.valid?)
    stage.save!
    puts "File "+ file_with_path+" loaded successfully."
  else
    puts "File "+ file_with_path+" invalid."
  end
 else
  puts "File "+ file_with_path+" is not a json, not loaded."
 end
}

