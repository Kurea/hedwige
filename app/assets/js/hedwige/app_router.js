define(['backbone'], function(Backbone) {
  var AppRouter = Backbone.Router.extend({

    routes: {
      "new_stage":     "newStage",
      "":             "gotoStage",
      ":identifier":  "gotoStage"
    },

    initialize: function(options) {
      this.app = options.app;
      _.bindAll(this, 'gotoStage', 'newStage');
    },

    gotoStage: function(identifier) {
      console.log('Router#gotoStage: ' + identifier);
      if (identifier == undefined) {
        // root page
        identifier = "accueil";
      }
      this.app.loadStage(identifier);
    },

    newStage: function() {
      console.log('Router#newStage');
      this.app.showStageForm();
    }
  });

  return AppRouter;
});