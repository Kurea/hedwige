define(['backbone', 'hedwige/collections/choices_collection'], function(Backbone, ChoicesCollection) {

  var StageForm = Backbone.Model.extend({

    defaults: {
      "key":  "",
      "type": "radio",
      "label": "" 
    },

    initialize: function(attributes, options) {
      this.choices = new ChoicesCollection(this.get('choices'));
    }

  });

  return StageForm;
});