define(['hedwige/views/auto_update_item_view', 'template/stage_ns_predicate' ],
function(AutoUpdateItemView, templateNsPredicate) {

  var NsPredicateView = AutoUpdateItemView.extend({

    className: 'ns-predicate',
    template: templateNsPredicate,

    triggers: {
      'click .ns-predicate-remove': 'remove'
    },

    initialize: function() {
      AutoUpdateItemView.prototype.initialize.call(this);
      _.bindAll(this, 'render');

    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });

  return NsPredicateView;
});