define(['marionette', 'hedwige/views/faqs/question_view'],
function(Marionette, FaqsQuestionView) {

  var FaqsQuestionsView = Marionette.CollectionView.extend({
    id: 'faqs-questions',
    className: 'col-md-6',
    childView: FaqsQuestionView,

    initialize: function() {
      this.on('childview:focus', function(childView) { this.trigger('question:focus', childView) });
      this.on('childview:blur', function(childView) { this.trigger('question:blur', childView) });
      //this.on('childview:change', function(childView) { this.trigger('question:change', childView) });
      this.on('childview:remove', function(childView) { this.trigger('question:remove', childView) });
    }
  });

  return FaqsQuestionsView;
});