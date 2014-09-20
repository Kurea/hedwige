define(['backbone', 'hedwige/models/next_stage'], function(Backbone, NextStage) {

  var NextStagesCollection = Backbone.Collection.extend({
    model: NextStage,

    getDefaultNextStage: function() {
      // Le next stage par defaut n'a pas de condition
      defStage = this.find(function (nextStage) {
        return nextStage.condition == undefined;
      });
      if(defStage != undefined) {
        defKeyStage = defStage.get('key');
      }
      else
      {
        defKeyStage = null;
      }
      return defKeyStage;

    }
  });

  return NextStagesCollection;
});