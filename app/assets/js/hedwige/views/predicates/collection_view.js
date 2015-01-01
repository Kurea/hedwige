define(['marionette', 'hedwige/views/predicates/predicate_view'],
function(Marionette, PredicateView) {

  var PredicatesCollectionView = Marionette.CollectionView.extend({
    
    itemView: PredicateView,

    initialize: function() {
      this.on('itemview:remove', function(childView) {
          // supprimer l'element
          childView.model.collection.remove(childView.model);
        }
      );

    }
  });

  return PredicatesCollectionView;
});