$(function() {
  
  window.Stage = Backbone.Model.extend({
    urlRoot: '/stages',

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
  
  var AppView = Backbone.View.extend({
    
    el: $("#app"),
    
    events: {
    },
    
    initialize: function() {
      this.fetchStage(1);
    },
    
    fetchStage: function(id) {
      this.stage = new Stage({id: id});
      this.stage.bind('change', this.renderStage, this);
    },

    renderStage: function() {
      var view = new StageView({model: this.stage});
      window.stageView = view;
      view.render();
    }
    
  });
  
  window.App = new AppView;
});