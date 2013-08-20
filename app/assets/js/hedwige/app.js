define([
  'backbone',
  'hedwige/app_router',
  'hedwige/models/user',
  'hedwige/collections/stage_references_collection', 'hedwige/models/stage_reference',
  'hedwige/models/stage', 'hedwige/views/stage_view', 'hedwige/views/stage_form_view'],

function(
  Backbone,
  AppRouter,
  User,
  StageReferencesCollection, stageReference,
  Stage, StageView, StageFormView) {

  var App = Backbone.View.extend({
    el: "#app",
    
    events: {
      "click #logo":            "gotoHome",
      "click #button-previous": "gotoPreviousStage",
      "click #button-next":     "gotoNextStage",
      "click #new-stage":       "gotoNewStage",
      "click #save":            "save"
    },
    
    initialize: function() {
      _.bindAll(this, 'loadStage', 'showStage', 'renderView');

      this.$container = this.$el.find('> .container');

      this.router = new AppRouter({app: this});
      this.user = new User();
      this.stageReferences = new StageReferencesCollection();
      this.stageReferences.fetch();

      this.converter = new Showdown.converter();

      // Only run once everything is setup
      Backbone.history.start({pushState: true});
    },
    
    loadStage: function(key) {
      //console.log('App#loadStage: ' + key);

      this.stage = new Stage({id: key}, {user: this.user});
      this.stage.bind('change', this.showStage, this);
      this.stage.fetch();
    },

    showStage: function() {
      this.renderView(new StageView({model: this.stage, user: this.user}));
      this.router.navigate(this.stage.get('key'));

      // Adjust header's buttons
      this.$el.find('#new-stage').show();
      this.$el.find('#save').hide();
    },

    showStageForm: function() {
      this.renderView(new StageFormView({stageReferences: this.stageReferences}));

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

    // the click event should be processed in StageView which should trigger the appropriate
    // event
    gotoNextStage: function(event) {
      if (!$(event.target).hasClass('disabled')) {
        this.user.pushStage(this.stage);

        var nextStageIdentifier = this.stage.nextStageIdentifierWithUser(this.user);
        if (nextStageIdentifier != undefined) {
          this.loadStage(nextStageIdentifier);
        }
      }
      return false;
    },
    
    gotoNewStage: function(event) {
      this.router.navigate('new_stage');
      this.showStageForm();
    },

    save: function(event) {
      this.currentView.save();
    },

    md2html: function(text) {
      // Cas des tooltips
      var modifiedText = text.replace(/\[\?\]\(([^()]*|(([\s\S]*)\(([^)]*)\)([^()]*)))\)/g, _.bind(function(match, data) {
        return "<a href='#' data-html='true' id='tooltip' title='"+this.converter.makeHtml(data)+"' data-placement='right'><i class='icon-question-sign'></i></a>";
      }, this));

      // cas standard
      return this.converter.makeHtml(modifiedText);
    }
  });

  return App;
});