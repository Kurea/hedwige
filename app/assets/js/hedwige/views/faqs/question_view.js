define(['hedwige/views/auto_update_item_view', 'template/faqs_question_input' ],
function(AutoUpdateItemView, templateFaqsQuestionInput) {

  var FaqsQuestionView = AutoUpdateItemView.extend({

    className: 'faqs-question',
    template: templateFaqsQuestionInput,

    triggers: {
      'focus input': 'focus',
      'blur input': 'blur',
      //'change input': 'change',
      'click .btn-remove': 'remove'
    }
  });

  return FaqsQuestionView;
});