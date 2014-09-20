define(['backbone', 'hedwige/models/condition'], function(Backbone, Condition) {

  var NextStage = Backbone.Model.extend({

    defaults: {
      "key":  "null"
    },

    initialize: function(attributes, options) {
      if (this.get('conditions') != undefined)
      {
        this.condition = new Condition(this.get('conditions'));
      }
      else
      {
        this.condition = new Condition();
      }
    }

  });

  return NextStage;
});