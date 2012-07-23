requirejs.config({
  // By default load any module IDs from js
  baseUrl: 'js/vendor',

  // except, if the module ID starts with "app",
  // load it from the js/app directory. paths
  // config is relative to the baseUrl, and
  // never includes a ".js" extension since
  // the paths config could be for a directory.
  paths: {
    hedwige:  '/js/hedwige',
    showdown: 'showdown/src/showdown',
    template: '/jst'
  },

  // to support traditional "browser globals" scripts (jQuery, Underscore, Backbone)
  shim: {
    'jquery': {
      exports: '$'
    },
    'bootstrap': {},
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'showdown': {
      exports: 'Showdown'
    }
  }
});

// Start the main app logic.
requirejs(
  [ 'jquery', 'underscore', 'backbone', 'showdown',
    'template/stage', 'template/faqs'],

function ($, _, Backbone, Showdown, templateStage, templateFaqs) {
  
  $(function() {
    console.log('starting Hedwige');

    var Stage = Backbone.Model.extend({
      urlRoot: '/data/stages',

      initialize: function() {
        this.fetch();
      }
    });
    
    var StageView = Backbone.View.extend({
      
      el: $('#stage'),
      template: templateStage,

      events: {
      },
      
      initialize: function() {
        _.bindAll(this, 'render');
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

      template: templateFaqs,

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
        console.log('showStage: ' + id);
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
        this.stageView = new StageView({model: this.stage});
        this.stageView.render();
        this.router.navigate(this.stage.id);
      },

      gotoPreviousStage: function(event) {
        console.log('going to previous stage');

        var prevId;
        if ((prevId = this.stage.attributes.prev) != undefined) {
          this.loadStage(prevId);
        }
        return false;
      },

      gotoNextStage: function(event) {
        console.log('going to next stage');

        var nextId;
        if ((nextId = this.stage.attributes.next) != undefined) {
          this.loadStage(nextId);
        }
        return false;
      }
      
    });
    
    window.App = new AppView;
  });   
});