define(['backbone', 'template/stage_form'],
function(Backbone, templateStageForm) {

  var StageFormView = Backbone.View.extend({
    id: 'stage-form',
    template: templateStageForm,
    partialSelect: '<option value="<%= key %>"><%= title %></option>',

    events: {
    },

    initialize: function(options) {
      _.bindAll(this, 'render');
      this.stageReferences = this.options.stageReferences;
      this.stageReferences.bind('reset', this.updateStageReferences, this);
    },

    render: function() {
      this.$el.html(this.template({stageReferences: this.stageReferences}));
      return this;
    },

    save: function() {
      console.log('StageFormView#save');
      var data = {};
      _.each(this.$el.find('input, textarea'), function(field) {
        data[field.name] = $(field).val();
      });
      console.log(data);
      return data;
    },

    updateStageReferences: function() {
      console.log('StageFormView#updateStageReferences');
      var that = this;
      _.each(this.$el.find('select'), function(select) {
        $(select).append(_.template(that.partialSelect,{key: 'none', title: "Aucune"}));
        that.stageReferences.each(function(stageReference) {
          $(select).append(_.template(that.partialSelect, stageReference.toJSON()));
        });
      });
    }
  });

  return StageFormView;
});