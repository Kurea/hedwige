define(['backbone.marionette', 'template/stage_ns_predicate' ],
function(Marionette, templateNsPredicate) {

  var NsPredicateView = Marionette.ItemView.extend({

    className: 'ns-predicate',
    template: templateNsPredicate,

    triggers: {
      'click .ns-predicate-remove': 'remove'
    },

    initialize: function() {
      _.bindAll(this, 'render');

    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });

  return NsPredicateView;
});