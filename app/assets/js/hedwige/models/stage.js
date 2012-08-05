define(['backbone'], function(Backbone) {

  var Stage = Backbone.Model.extend({
    urlRoot: '/data/stages',

    nextStageIdentifierWithUser: function(user) {
      var next = this.get('next');
      if (typeof(next) == 'string') {
        // Single choice, no conditions
        return next;
      }
      else if (typeof(next) == 'object') {
        if (next.constructor.name == 'Object') {
          // 'next' saved as object. Converting to array.
          next = [next];
        }
        for (var stageIndex in next) {
          var stage = next[stageIndex];

          // going through each possible stage in order, checking conditions and returning
          // the identifier as soon one stage with valid conditions is found
          if (stage.conditions != undefined) {
            if (stage.conditions.constructor.name == 'Object') {
              stage.conditions = [stage.conditions];
            }
            var conditionsValid = true;
            for (var conditionIndex in stage.conditions) {
              var condition = stage.conditions[conditionIndex];
              
              var predicatesValid = true;
              for (var predicateIndex in condition.predicates) {
                var predicate = condition.predicates[predicateIndex];
                if (user.getChoice(predicate.identifier) != predicate.value) {
                  predicatesValid = false;
                  break;
                }
              }

              if (predicatesValid == false) {
                conditionsValid = false;
                break;
              }
            }

            if (conditionsValid == true) {
              return stage.identifier;
            }
          }
          else {
            return stage.identifier;
          }
        }
      }
    }
  });

  return Stage;
});