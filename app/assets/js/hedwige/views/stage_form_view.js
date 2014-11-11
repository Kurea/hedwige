define([
  'backbone', 'hedwige/models/stage_form',
  'hedwige/views/choices/collection_view',
  'template/stage_form',
  'chosen.jquery'],
function(
  Backbone, StageForm,
  ChoicesCollectionView, 
  templateStageForm) {

  var StageFormView = Backbone.View.extend({
    
    template: templateStageForm,

    events: {
      'click #form-choice-add': 'clickAddChoice',
      'change #stage_form_key': 'updateModel',
      'change #stage_form_label': 'updateModel'
    },

    initialize: function(options) {
      _.bindAll(this, 'render');

      this.choicesCollectionView = new ChoicesCollectionView({
        collection: this.model.choices
      });
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      this.$el.append(this.choicesCollectionView.render().el);
      return this;
    },

    clickAddChoice: function(event) {
      if (event && event.preventDefault){ event.preventDefault(); }
      this.model.choices.add({});
      return false;
    },

    updateModel: function(event) {
      var field = $(event.currentTarget);
      var value = field.val();
      var data = field.attr('name');
      this.model.set(data, value);
    }

  });

  return StageFormView;
});