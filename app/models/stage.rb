class Stage
  include Mongoid::Document
  include Mongoid::Timestamps

  field :key, :type => String
  field :title, :type => String
  field :text, :type => String

  field :prev
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

  def self.tree
    {
    :nodes => Stage.all.collect_concat { |stage|
      [
        {
          :data => { :id => stage.key, :name => stage.key}
        }
      ]

     },
    :edges => Stage.all.collect_concat { |stage|
        if stage.next.is_a? String then
          [{
            :data => {
              :source => stage.key,
              :target => stage.next,
            },
            :classes => 'default-path'
          }]
        elsif stage.next.is_a? Array then
          stage.next.collect_concat { |nexti|
            {
              :data => {
                :source => stage.key,
                :target => nexti['key']
              },
              :classes => nexti['conditions'].nil? ? 'default-path' : 'edge'
            }
          }
        end
     }.reject { |i| i.nil? } 
    }
  end
end