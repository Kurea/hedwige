$(function() {
  
  window.Stage = Backbone.Model.extend({
    urlRoot: '/data/stages',

    initialize: function() {
      this.fetch();
    }
  });
  
  window.StageView = Backbone.View.extend({
    
    el: $('#stage'),
    template: _.template($('#template-stage').html()),

    events: {
    },
    
    initialize: function() {
      this.faqsView = new FaqsView({
        attributes: {
          faqs: this.model.attributes.faqs
        }
      });
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      this.$el.find('#faqs').replaceWith(this.faqsView.render().el);

      // Show/hide buttons
      var prevButton = this.$el.find('#button-previous');
      var nextButton = this.$el.find('#button-next');
      this.model.attributes.prev != undefined ? prevButton.show() : prevButton.hide();
      this.model.attributes.next != undefined ? nextButton.show() : nextButton.hide();
      return this;
    }
  });

  window.FaqsView = Backbone.View.extend({

    tagName:   'div',
    id:       'faqs',

    template: _.template($('#template-faqs').html()),

    events: {
      "click a": "clickedFaq"
    },

    clickedFaq: function(event) {
      this.$el.find('#faq-answer').html(this.attributes.faqs[$(event.target).data('index')].answer);
      return false; // Prevent the event from bubbling. We want this because we're clicking an empty link.
    },

    render: function() {
      this.$el.html(this.template(this.attributes));
      return this;
    }

  });
  
  var AppRouter = Backbone.Router.extend({

    routes: {
      "":      "showStage",
      ":id":   "showStage"
    },

    initialize: function(options) {
      this.appView = options.appView;
      _.bindAll(this, 'showStage');
    },

    showStage: function(id) {
      if (id == undefined) {
        // root page
        id = "accueil";
      }
      this.appView.loadStage(id);
    }

  });

  var AppView = Backbone.View.extend({
    
    el: $("#app"),
    
    events: {
      "click #button-previous": "gotoPreviousStage",
      "click #button-next":     "gotoNextStage"
    },
    
    initialize: function() {
      this.router = new AppRouter({appView: this});
      Backbone.history.start({pushState: true});
    },
    
    loadStage: function(id) {
      this.stage = new Stage({id: id});
      this.stage.bind('change', this.renderStage, this);
    },

    renderStage: function() {
      var view = new StageView({model: this.stage});
      view.render();
      this.router.navigate(this.stage.id);
    },

    gotoPreviousStage: function(event) {
      var prevId;
      if ((prevId = this.stage.attributes.prev) != undefined) {
        this.loadStage(prevId);
      }
      return false;
    },

    gotoNextStage: function(event) {
      var nextId;
      if ((nextId = this.stage.attributes.next) != undefined) {
        this.loadStage(nextId);
      }
      return false;
    }
    
  });
  
  window.App = new AppView;
});