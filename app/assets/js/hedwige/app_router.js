define(['backbone'], function(Backbone) {
  var AppRouter = Backbone.Router.extend({

    routes: {
      "new_stage":     "newStage",
      "":             "gotoStage",
      ":key":  "gotoStage"
    },

    initialize: function(options) {
      this.app = options.app;
      _.bindAll(this, 'gotoStage', 'newStage');
    },

    gotoStage: function(key) {
      console.log('Router#gotoStage: ' + key);
      if (key == undefined) {
        // root page
        key = "accueil";
      }
      this.app.loadStage(key);
    },

    newStage: function() {
      console.log('Router#newStage');
      this.app.showStageForm();
    }
  });

  return AppRouter;
});