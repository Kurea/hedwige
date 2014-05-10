define(['backbone', 'hedwige/models/choice'], function(Backbone, Choice) {

  var ChoicesCollection = Backbone.Collection.extend({
    model: Choice
  });

  return ChoicesCollection;
});