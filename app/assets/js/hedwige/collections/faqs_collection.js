define(['backbone', 'hedwige/models/faq'], function(Backbone, Faq) {

  var FaqsCollection = Backbone.Collection.extend({
    model: Faq
  });

  return FaqsCollection;
});