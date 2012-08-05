define(['backbone', 'hedwige/appRouter', 'hedwige/models/user', 'hedwige/models/stage', 'hedwige/views/stageView'],
function(Backbone, AppRouter, User, Stage, StageView) {

  var App = Backbone.View.extend({
    el: $("#app"),
    
    events: {
      "click #button-previous": "gotoPreviousStage",
      "click #button-next":     "gotoNextStage"
    },
    
    initialize: function() {
      this.router = new AppRouter({app: this});
      this.user = new User();
      Backbone.history.start({pushState: true});
    },
    
    loadStage: function(identifier) {
      //console.log('App#loadStage: ' + identifier);

      this.stage = new Stage({id: identifier});
      this.stage.bind('change', this.renderStage, this);
      this.stage.fetch();
    },

    renderStage: function() {
      console.log('App#renderStage: ' + this.stage.get('identifier'));

      if (this.stageView != undefined) {
        this.stageView.remove();
      }

      this.stageView = new StageView({model: this.stage, user: this.user});
      this.$el.append(this.stageView.render().$el);
      this.router.navigate(this.stage.get('identifier'));
    },

    gotoPreviousStage: function(event) {
      console.log('App#gotoPreviousStage');

      var prevId;
      if ((prevId = this.stage.attributes.prev) != undefined) {
        this.loadStage(prevId);
      }
      return false;
    },

    gotoNextStage: function(event) {
      var nextStageIdentifier = this.stage.nextStageIdentifierWithUser(this.user);
      //console.log('App#gotoNextStage: '+ nextStageIdentifier);

      if (nextStageIdentifier != undefined) {
        this.loadStage(nextStageIdentifier);
      }
      return false;
    }
    
  });

  return App;
});