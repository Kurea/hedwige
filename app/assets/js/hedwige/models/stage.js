define(['backbone', 'hedwige/collections/faqs_collection', 'hedwige/models/stage_form', 
  'hedwige/collections/next_stages_collection'],
  function(Backbone, FaqsCollection, StageForm, NextStagesCollection) {

  var Stage = Backbone.Model.extend({
    urlRoot: '/data/stages',
    
    defaults: {
      "key":  "",
      "title":     "",
      "text":    ""
    },

    initialize: function(attributes, options) {
      this.faqs = new FaqsCollection();
      this.nextStages = new NextStagesCollection();
      if(options.mode == 'display') {
        this.on('change:text', function() {
          this.processTexts(options.user.choices);
        });
      }
      this.on('change:faqs', function() {
        this.faqs = new FaqsCollection(this.get('faqs'));
      });
      this.on('change:forms', function() {
        this.forms = [new StageForm(this.get('forms')[0])];
      });
      this.on('change:next', function() {
        if (typeof(this.get('next')) == 'object')
        {
          this.nextStages = new NextStagesCollection(this.get('next'));
        }
        else
        {
          this.nextStages = new NextStagesCollection({'key': this.get('next')});
          //this.nextStages = this.get('next');
        }
      });
    },

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
      this.attributes.text = _.template(this.get('text'))(userChoices);

      // Process forms
      var forms = this.get('forms');
      for (var formIndex in forms) {
        var form = forms[formIndex];
        form.label = _.template(form.label)(userChoices);
        for (var choiceIndex in form.choices) {
          var choice = form.choices[choiceIndex];
          choice.text = _.template(choice.text)(userChoices);
        }
        // TODO catch ReferenceError if userChoices does not contain a reference in form.label

      // Process faqs
      var faqs = this.get('faqs');
      for (var faqIndex in faqs) {
        var faq = faqs[faqIndex];
        faq.question = _.template(faq.question)(userChoices);
        faq.answer = _.template(faq.answer)(userChoices);
      }

      }
    },

    createForm: function() {
      this.forms = [new StageForm()];
    },

    removeForm: function() {
      delete this.forms[0];
      this.forms = [];
    },

    toJSONToSave: function() {
      var json = Backbone.Model.prototype.toJSON.call(this);
      if (this.forms != undefined) {
        var formsJson = _.map(this.forms, function(form){
          return form.toJSONToSave();
        });
        json = _.extend(json, {forms: formsJson});
      }
      if (this.nextStages.length > 0) {
        var nextStagesJson = _.map(this.nextStages.models, function(nextStage){
          return nextStage.toJSONToSave();
        });
        json = _.extend(json, {next: nextStagesJson});
      }
      if(this.faqs.length > 0) {
        json = _.extend(json, {faqs: this.faqs.toJSON()})
      }
      return json;
    },

    validate: function(attrs, options) {
      debugger
      error = [];
      // if we are saving the model
      //if (options.validate) {
        if (!attrs.key) {
          error.push({name: 'key', message: 'An identifier is required'});
        }
        if (!attrs.title) {
          error.push({name: 'title', message: 'A title is required'});
        }
        if (!attrs.text) {
          error.push({name: 'text', message: 'Please describe the step'});
        }
      //}

      return error.length > 0 ? error : false;
    }
  });

  return Stage;
});