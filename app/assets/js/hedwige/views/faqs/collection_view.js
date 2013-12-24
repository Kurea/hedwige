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
      var prevFaq
      this.faqsQuestionsView.
        bind('question:focus', function(childView) {
          console.log('question:focus');
          if (prevFaq == undefined)
          {
            $("[name=answer]").removeClass("hide");
            $("[name=answer]").addClass("input-fullwidth");
          }
          else
          {
            prevFaq.model.set('answer', $("[name=answer]").val());
          }
          $("[name=answer]").val(childView.model.get('answer'));
          console.log(childView);
        }).
        bind('question:blur', function(childView) {
          console.log('question:blur');
          prevFaq = childView;
          console.log(childView);
        }).
        bind('question:change', function(childView) {
          console.log('question:change');
          childView.model.set('question', childView.$el.find('[name=question]').val());
          console.log(childView);
        }).bind('question:remove', function(childView) {
          console.log('question:remove');
          console.log(childView);

          if(childView == prevFaq) {
            $("[name=answer]").val("");
            $("[name=answer]").addClass("hide");
            $("[name=answer]").removeClass("input-fullwidth");
            prevFaq = undefined;
          }
          childView.model.collection.remove(childView.model);

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