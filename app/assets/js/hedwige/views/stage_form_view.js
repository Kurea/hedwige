define(['backbone', 'template/stage_form'],
function(Backbone, templateStageForm) {

  var StageFormView = Backbone.View.extend({
    id: 'stage-form',
    template: templateStageForm,

    events: {
    },

    initialize: function(options) {
      _.bindAll(this, 'render');
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },
  });

  return StageFormView;
});