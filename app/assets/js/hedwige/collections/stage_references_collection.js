define(['backbone'], function(Backbone) {

  var StageReferencesCollection = Backbone.Collection.extend({
    url: '/data/stage_references'
  });

  return StageReferencesCollection;
});