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
    },

    toJSONToSave: function() {
      var json = Backbone.Model.prototype.toJSON.call(this);
      if (this.condition.hasPredicates())
      {
        json = _.extend(json, {conditions: this.condition.toJSONToSave()});
      }
      return json;
    }

  });

  return NextStage;
});