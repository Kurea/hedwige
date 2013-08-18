define(['backbone.marionette', 'hedwige/views/faqs/questions_view', 'template/faqs_collection_view'],
function(Marionette, FaqsQuestionsView, templateFaqsCollectionView) {

  var FaqsCollectionView = Marionette.View.extend({
    id: 'faqs-collection',
    className: 'row',
    template: templateFaqsCollectionView,

    initialize: function() {
      this.faqsQuestionsView = new FaqsQuestionsView({
        collection: this.collection
      });
      this.faqsQuestionsView.
        bind('question:focus', function(childView) {
          console.log('question:focus');
          console.log(childView);
        }).
        bind('question:blur', function(childView) {
          console.log('question:blur');
          console.log(childView);
        }).bind('question:remove', function(childView) {
          console.log('question:remove');
          console.log(childView);
        }
      );
    },

    render: function() {
      this.$el.html(this.template());
      this.$el.prepend(this.faqsQuestionsView.render().el);
      return this;
    }
  });

  return FaqsCollectionView;
});