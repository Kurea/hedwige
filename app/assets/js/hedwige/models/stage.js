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
          // the key as soon one stage with valid conditions is found
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
                if (user.getChoice(predicate.key) != predicate.value) {
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
              return stage.key;
            }
          }
          else {
            return stage.key;
          }
        }
      }
    },

    // Process stage's text without triggering 'change' events.
    processTexts: function(userChoices) {
      // Process text
      this.attributes.text = _.template(this.get('text'), userChoices);

      // Process forms
      var forms = this.get('forms');
      for (var formIndex in forms) {
        var form = forms[formIndex];
        form.label = _.template(form.label, userChoices);
        for (var choiceIndex in form.choices) {
          var choice = form.choices[choiceIndex];
          choice.text = _.template(choice.text, userChoices);
        }
        // TODO catch ReferenceError if userChoices does not contain a reference in form.label
      }
    }
  });

  return Stage;
});