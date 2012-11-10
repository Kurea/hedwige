class Stage
  include Mongoid::Document
  include Mongoid::Timestamps

  field :key, :type => String
  field :title, :type => String
  field :text, :type => String

  field :previous
  field :next
  
  embeds_many :faqs

  def self.find_by_key(key)
    Stage.where(:key => key).first
  end

  def self.references
    Stage.all.collect do |stage|
      {
        :key => stage.key,
        :title => stage.title
      }
    end
  end
end