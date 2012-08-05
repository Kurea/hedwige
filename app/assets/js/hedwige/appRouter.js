define(['backbone'], function(Backbone) {
  var AppRouter = Backbone.Router.extend({

    routes: {
      "":             "gotoStage",
      ":identifier":  "gotoStage"
    },

    initialize: function(options) {
      this.app = options.app;
      _.bindAll(this, 'gotoStage');
    },

    gotoStage: function(identifier) {
      //console.log('gotoStage: ' + identifier);
      if (identifier == undefined) {
        // root page
        identifier = "accueil";
      }
      this.app.loadStage(identifier);
    }

  });

  return AppRouter;
});