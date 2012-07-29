define(['backbone'], function(Backbone) {

  var User = Backbone.Model.extend({

    initialize: function() {
      self.choices = {};
    },

    setChoice: function(formIdentifier, choiceIdentifier) {
      console.log('User#setChoice: ' + formIdentifier + ' -> ' + choiceIdentifier);
      self.choices[formIdentifier] = choiceIdentifier;
    },

    getChoice: function(formIdentifier) {
      return self.choices[formIdentifier];
    }
  });

  return User;
});