define(['backbone'], function(Backbone) {

  var User = Backbone.Model.extend({

    initialize: function() {
      this.choices = {};
      this.history = []; // ids of stages
    },

    setChoice: function(formIdentifier, choiceIdentifier) {
      console.log('User#setChoice: ' + formIdentifier + ' -> ' + choiceIdentifier);
      this.choices[formIdentifier] = choiceIdentifier;
    },

    getChoice: function(formIdentifier) {
      return this.choices[formIdentifier];
    },

    pushStage: function(stage) {
      this.history.push(stage.get('identifier'));
    },

    popStage: function() {
      return this.history.pop();
    }
  });

  return User;
});