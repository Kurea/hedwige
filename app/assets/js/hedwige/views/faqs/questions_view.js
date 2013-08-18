define(['backbone.marionette', 'hedwige/views/faqs/question_view'],
function(Marionette, FaqsQuestionView) {

  var FaqsQuestionsView = Marionette.CollectionView.extend({
    id: 'faqs-questions',
    className: 'span6',
    itemView: FaqsQuestionView,

    initialize: function() {
      this.on('itemview:focus', function(childView) { this.trigger('question:focus', childView) });
      this.on('itemview:blur', function(childView) { this.trigger('question:blur', childView) });
      this.on('itemview:remove', function(childView) { this.trigger('question:remove', childView) });
    }
  });

  return FaqsQuestionsView;
});