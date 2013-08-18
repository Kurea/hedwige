define(['backbone', 'hedwige/views/faqs_view', 'template/stage'],
function(Backbone, FaqsView, templateStage) {

  var StageView = Backbone.View.extend({
    id: 'stage',
    template: templateStage,

    events: {
      "change input": "selectedChoice"
    },

    initialize: function(options) {
      _.bindAll(this, 'render');

      this.user = this.options['user'];

      this.faqsView = new FaqsView({
        attributes: {
          faqs: this.model.attributes.faqs
        }
      });
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      this.$el.find('#faqs').replaceWith(this.faqsView.render().el);

      // Buttons
      var prevButton = this.$el.find('#button-previous');
      var nextButton = this.$nextButton = this.$el.find('#button-next');

      // Show/hide
      this.model.attributes.prev != undefined ? prevButton.show() : prevButton.hide();
      this.model.attributes.next != undefined ? nextButton.show() : nextButton.hide();

      // Enable/disable next
      if (this.model.get('forms') != undefined) nextButton.addClass('disabled');

      return this;
    },

    selectedChoice: function(event) {
      var formIdentifier = event.currentTarget.name;
      var choiceIdentifier = event.currentTarget.id;
      this.user.setChoice(formIdentifier, choiceIdentifier);

      this.$nextButton.removeClass('disabled');

      return false;
    }
  });

  return StageView;
})


