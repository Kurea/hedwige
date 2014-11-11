define(['backbone', 'hedwige/collections/choices_collection'], function(Backbone, ChoicesCollection) {

  var StageForm = Backbone.Model.extend({

    defaults: {
      "key":  "",
      "type": "radio",
      "label": "" 
    },

    initialize: function(attributes, options) {
      this.choices = new ChoicesCollection(this.get('choices'));
    },

    toJSONToSave: function() {
      var json = Backbone.Model.prototype.toJSON.call(this);
      if (this.choices.length > 0)
      {
        json = _.extend(json, {choices: this.choices.toJSON()});
      }
      return json;
    }

  });

  return StageForm;
});