define(['marionette', 'template/stage_ns_condition', 'hedwige/views/predicates/collection_view' ],
function(Marionette, templateNsCondition, PredicatesCollectionView) {

  var NsConditionView = Marionette.ItemView.extend({

    template: templateNsCondition,

    events: {
      'click .add-predicate': 'clickAddPredicate'
    },

    initialize: function() {
      _.bindAll(this, 'render');
      this.predicatesCollectionView = new PredicatesCollectionView({
        collection: this.model.predicates
      });
    },

    render: function() {
      this.$el.html(this.template());
      this.$el.find('.predicates-collection').html(this.predicatesCollectionView.render().el);

      return this;
    },

    clickAddPredicate: function(event) {
      if (event && event.preventDefault){ event.preventDefault(); }
      this.model.predicates.add({});

    }
  });

  return NsConditionView;
});