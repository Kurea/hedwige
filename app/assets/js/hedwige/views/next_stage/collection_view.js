define(['marionette', 'hedwige/views/next_stage/next_stage_view'],
function(Marionette, NextStageView) {

  var NextStagesCollectionView = Marionette.CollectionView.extend({
    
    itemView: NextStageView,

    initialize: function(options) {
      this.options = options;
      this.on('itemview:remove', function(childView) {
          // supprimer l'element
          childView.model.collection.remove(childView.model);
        }
      );

    },

    itemViewOptions: function(model, index) {
      return {
        stageReferences: this.options.stageReferences
      }
    }
  });

  return NextStagesCollectionView;
});