define(['hedwige/views/auto_update_item_view', 'template/stage_form_choice' ],
function(AutoUpdateItemView, templateFormChoice) {

  var FormChoiceView = AutoUpdateItemView.extend({

    className: 'form-choice',
    template: templateFormChoice,

    triggers: {
      'click .form-choice-remove': 'remove',
    },

    initialize: function() {
      AutoUpdateItemView.prototype.initialize.call(this);
      _.bindAll(this, 'render');

    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });

  return FormChoiceView;
});