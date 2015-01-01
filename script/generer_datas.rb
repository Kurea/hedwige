# rb data generator

{
:nodes => Stage.references.collect_concat { |stage|
  [
    {
      :data => { :id => stage[:key], :name => stage[:key]}
    }
  ]

 },
:edges => Stage.references.collect_concat { |stage|
  stageData = Stage.find_by_key(stage[:key])

    if stageData[:next].is_a? String then
      [{
        :data => {
          :source => stage[:key],
          :target => stageData[:next],
        },
        :classes => 'default-path'
      }]
    elsif stageData[:next].is_a? Array then
      stageData[:next].collect_concat { |nexti|
        {
          :data => {
            :source => stage[:key],
            :target => nexti['key']
          },
          :classes => nexti['conditions'].nil? ? 'default-path' : 'edge'
        }
      }
    end
 }.reject { |i| i.nil? } 
}