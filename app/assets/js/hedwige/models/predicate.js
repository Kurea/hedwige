define(['backbone'], function(Backbone) {
// Defini un predicat pour passer à l'étape suivante
// esuivalent à "si key = value"

  var Predicate = Backbone.Model.extend({

    defaults: {
      "key":  "",
      "value": "" 
    }

  });

  return Predicate;
});