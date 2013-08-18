define(['backbone.marionette', 'template/faqs_question_input' ],
function(Marionette, templateFaqsQuestionInput) {

  var FaqsQuestionView = Marionette.ItemView.extend({

    className: 'faqs-question',
    template: templateFaqsQuestionInput,

    triggers: {
      'focus input': 'focus',
      'blur input': 'blur',
      'click .btn-remove': 'remove'
    }
  });

  return FaqsQuestionView;
});