define(['hedwige/views/auto_update_item_view', 'template/stage_ns_next_stage', 'hedwige/views/condition_view', 'chosen.jquery'],
function(AutoUpdateItemView, templateNsNextStage, ConditionView) {

  var NsNextStageView = AutoUpdateItemView.extend({

    className: 'ns-next-stage',
    template: templateNsNextStage,
    autoUpdateSelector: ':not(.ns-condition)',

    triggers: {
      'click .ns-next-stage-remove': "remove"
    },

    initialize: function() {
      AutoUpdateItemView.prototype.initialize.call(this);
      _.bindAll(this, 'render');
      this.conditionView = new ConditionView({
        model: this.model.condition
      });
    },

    render: function() {
      var templateData = _.extend(this.model.toJSON(), {
        stageReferences: this.options.stageReferences
      });
      this.$el.html(this.template(templateData));
      this.$el.find('[value=' + this.getValueSelected() +"]").first().attr('selected', true);
      this.$el.find('.ns-condition').html(this.conditionView.render().el);
      return this;
    },

    getValueSelected : function() {
      valueSelected = this.model.get('key');
      if ((valueSelected == undefined) || (valueSelected == null))
      {
        // si il n'y a pas d'étape précédente, selectionner Aucune
        // undefined : cas de la création d'une étape
        // null cas de la permière ou de la dernière étape
        valueSelected = 'null';
      }
      return valueSelected;
    }


  });

  return NsNextStageView;
});