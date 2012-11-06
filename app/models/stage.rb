class Stage
  include Mongoid::Document
  include Mongoid::Timestamps

  field :key, :type => String
  field :previous, :type => String
  field :next, :type => String
  field :title, :type => String
  field :text, :type => String
  embeds_many :faqs

  def self.references
    Stage.all.collect do |stage|
      {
        :key => stage.key,
        :title => stage.title
      }
    end
  end
end