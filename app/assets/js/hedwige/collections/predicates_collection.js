define(['backbone', 'hedwige/models/predicate'], function(Backbone, Predicate) {
// Une collection de predicats pour le passage à l'étape suivante
// Si tous les predicats sont juste, on passe à l'étape suivante définie

  var PredicatesCollection = Backbone.Collection.extend({
    model: Predicate
  });

  return PredicatesCollection;
});