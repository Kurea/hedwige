define(['backbone.marionette', 'template/stage_form_choice' ],
function(Marionette, templateFormChoice) {

  var FormChoiceView = Marionette.ItemView.extend({

    className: 'form-choice',
    template: templateFormChoice,

    triggers: {
      'click .form-choice-remove': 'remove'
    },

    initialize: function() {
      _.bindAll(this, 'render');

    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });

  return FormChoiceView;
});