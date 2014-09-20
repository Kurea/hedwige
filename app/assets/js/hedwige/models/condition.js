define(['backbone', 'hedwige/collections/predicates_collection'],
  function(Backbone, PredicatesCollection) {
// Defini une condition pour passer à l'étape suivante
// une condition est composée d'une collection de prédicats (pour le moment)
// on pourra ajouter un opérateur (pour gérer le ET/OU) --> tout est ET pour le moment


  var Condition = Backbone.Model.extend({

    // Pour plus tard... beaucoup plus tard
    /*
    defaults: {
      "operator":  "and",
    },*/ 

    initialize: function(attributes, options) {

      if (this.get('predicates') != undefined)
      {
        this.predicates = new PredicatesCollection(this.get('predicates'));
      }
      else
      {
        this.predicates = new PredicatesCollection();
      }
    }

  });

  return Condition;
});