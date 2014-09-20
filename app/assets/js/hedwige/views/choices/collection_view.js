define(['backbone.marionette', 'hedwige/views/choices/choice_view'],
function(Marionette, ChoiceView) {

  var ChoicesCollectionView = Marionette.CollectionView.extend({
    
    //id: 'choices-collection',
    itemView: ChoiceView,

    initialize: function() {
      this.on('itemview:remove', function(childView) {
          // supprimer l'element
          childView.model.collection.remove(childView.model);
        }
      );

    }
  });

  return ChoicesCollectionView;
});