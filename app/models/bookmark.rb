class BaseAppModel
  include Mongoid::Document
  include Mongoid::Timestamps

  field :field, type: String
end