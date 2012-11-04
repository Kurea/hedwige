define(['backbone', 'hedwige/app_router', 'hedwige/models/user', 'hedwige/models/stage', 'hedwige/views/stage_view', 'hedwige/views/stage_form_view'],
function(Backbone, AppRouter, User, Stage, StageView, StageFormView) {

  var App = Backbone.View.extend({
    el: "#app",
    
    events: {
      "click #logo":            "gotoHome",
      "click #button-previous": "gotoPreviousStage",
      "click #button-next":     "gotoNextStage",
      "click #new-stage":       "gotoNewStage"
    },
    
    initialize: function() {
      _.bindAll(this, 'loadStage', 'showStage', 'renderView');

      this.$container = this.$el.find('> .container');

      this.router = new AppRouter({app: this});
      this.user = new User();

      // Only run once everything is setup
      Backbone.history.start({pushState: true});
    },
    
    loadStage: function(identifier) {
      //console.log('App#loadStage: ' + identifier);

      this.stage = new Stage({id: identifier});
      this.stage.bind('change', this.showStage, this);
      this.stage.fetch();
    },

    showStage: function() {
      this.stage.processTexts(this.user.choices);
      this.renderView(new StageView({model: this.stage, user: this.user}));
      this.router.navigate(this.stage.get('identifier'));

      // Adjust header's buttons
      this.$el.find('#new-stage').show();
      this.$el.find('#save').hide();
    },

    showStageForm: function() {
      this.renderView(new StageFormView());

      // Adjust header's buttons
      this.$el.find('#new-stage').hide();
      this.$el.find('#save').show();
    },

    renderView: function(view) {
      if (this.currentView != undefined) {
        this.currentView.remove();
      }
      this.currentView = view;
      this.$container.append(this.currentView.render().el);
    },

    gotoHome: function(event) {
      this.router.navigate('/', {trigger: true});
    },

    gotoPreviousStage: function(event) {
      console.log('App#gotoPreviousStage');

      var prevId;
      if ((prevId = this.user.popStage() || this.stage.attributes.prev) != undefined) {
        this.loadStage(prevId);
      }
      return false;
    },

    gotoNextStage: function(event) {
      this.user.pushStage(this.stage);

      var nextStageIdentifier = this.stage.nextStageIdentifierWithUser(this.user);
      //console.log('App#gotoNextStage: '+ nextStageIdentifier);

      if (nextStageIdentifier != undefined) {
        this.loadStage(nextStageIdentifier);
      }
      return false;
    },
    
    gotoNewStage: function(event) {
      this.router.navigate('new_stage');
      this.showStageForm();
    }
  });

  return App;
});