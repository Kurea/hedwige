define(['backbone'], function(Backbone) {

  var Choice = Backbone.Model.extend({

    defaults: {
      "key":  "",
      "text": "" 
    }

  });

  return Choice;
});