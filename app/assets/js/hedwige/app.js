define([
  'backbone',
  'hedwige/app_router',
  'hedwige/models/user',
  'hedwige/models/stage', 'hedwige/views/stage_view', 'hedwige/views/stage_edit_view'],

function(
  Backbone,
  AppRouter,
  User,
  Stage, StageView, StageEditView) {

  var App = Backbone.View.extend({
    el: "#app",
    
    events: {
      "click #logo":            "gotoHome",
      "click #button-previous": "gotoPreviousStage",
      "click #button-next":     "gotoNextStage",
      "click #new-stage":       "gotoNewStage",
      "click #edit-stage":      "gotoEditStage", 
      "click #cancel":          "gotoStart", 
      "click #save":            "save",
    },
    
    initialize: function() {
      _.bindAll(this, 'loadStage', 'showStage', 'renderView');

      this.$container = this.$el.find('> .container');

      this.router = new AppRouter({app: this});
      this.user = new User();

      this.converter = new Showdown.converter();

      // Only run once everything is setup
      Backbone.history.start({pushState: true});
    },
    
    loadStage: function(key) {
      //console.log('App#loadStage: ' + key);

      this.stage = new Stage({id: key}, {user: this.user, mode: 'display'});
      this.stage.bind('change', this.showStage, this);
      this.stage.fetch();
    },

    showStage: function() {
      this.renderView(new StageView({model: this.stage, user: this.user}));
      this.router.navigate(this.stage.get('key'));

      // Adjust header's buttons
      this.$el.find('#new-stage').show();
      this.$el.find('#edit-stage').show();
      this.$el.find('#cancel').hide();
      this.$el.find('#save').hide();
    },

    loadStageForm: function(key) {
      console.log('App#loadStageForm: ' + key);

      this.stage = new Stage({id: key}, {user: this.user, mode: 'edit'});
      this.stage.bind('change', this.showStageForm, this);
      this.stage.fetch();
    },

    showStageForm: function() {
      if (this.stage == undefined)
      {
        this.stage = new Stage({}, {mode: 'edit'});
      }
      this.renderView(new StageEditView({model: this.stage}));

      // Adjust header's buttons
      this.$el.find('#new-stage').hide();
      this.$el.find('#edit-stage').hide();
      this.$el.find('#cancel').show();
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
      this.stage = new Stage({}, {mode: 'edit'});
      this.router.navigate('new_stage', {trigger: true});
    },

    gotoEditStage: function(event) {
      console.log('App#gotoEditStage: ' + this.stage.get('key'));
      this.router.navigate(this.stage.get('key')+'/edit', {trigger: true});
    },

    gotoStart: function() {
      this.router.navigate('', {trigger: true});
    },

    save: function(event) {
      console.log('StageEditView#save');
      console.log(this)
      //var data = {};
      var data = this.stage.toJSONToSave();
      console.log(data);
      return data;
    },

    md2html: function(text) {
      // Cas des tooltips
      var modifiedText = text.replace(/\[\?\]\(([^()]*|(([\s\S]*)\(([^)]*)\)([^()]*)))\)/g, _.bind(function(match, data) {
        return "<a href='#' data-html='true' id='tooltip' title='"+this.converter.makeHtml(data)+"' data-placement='right'><i class='glyphicon glyphicon-question-sign'></i></a>";
      }, this));

      // cas standard
      return this.converter.makeHtml(modifiedText);
    }
  });

  return App;
});