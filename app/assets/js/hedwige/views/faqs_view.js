define(['backbone', 'template/faqs'],
function(Backbone, templateFaqs) {

  var FaqsView = Backbone.View.extend({
    tagName:  'div',
    id:       'faqs',

    template: templateFaqs,

    events: {
      "click a": "clickedFaq"
    },

    clickedFaq: function(event) {
      this.$el.find('#faq-answer').html(App.md2html(this.attributes.faqs[$(event.target).data('index')].answer));
      this.$el.find('#tooltip').tooltip();
      return false; // Prevent the event from bubbling. We want this because we're clicking an empty link.
    },

    render: function() {
      this.$el.html(this.template(this.attributes));
      return this;
    }

  });

  return FaqsView;
});
