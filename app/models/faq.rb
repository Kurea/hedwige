class Faq
  include Mongoid::Document
  include Mongoid::Timestamps

  embedded_in :stage

  field :question, :type => String
  field :answer, :type => String
end