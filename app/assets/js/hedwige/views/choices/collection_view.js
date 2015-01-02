define(['marionette', 'hedwige/views/choices/choice_view'],
function(Marionette, ChoiceView) {

  var ChoicesCollectionView = Marionette.CollectionView.extend({
    
    //id: 'choices-collection',
    childView: ChoiceView,

    initialize: function() {
      this.on('childview:remove', function(childView) {
          // supprimer l'element
          childView.model.collection.remove(childView.model);
        }
      );

    }
  });

  return ChoicesCollectionView;
});