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
          // si il n'y avait pas de question selectionnee avant, afficher la zone de réponse
          if (prevFaq == undefined)
          {
            $("[name=answer]").removeClass("hide");
            $("[name=answer]").addClass("input-fullwidth");
          }
          else // si il y en avait une, enregistrer la réponse
          {
            prevFaq.model.set('answer', $("[name=answer]").val());
          }
          // afficher la réponse pour la question courante
          $("[name=answer]").val(childView.model.get('answer'));
        }).
        bind('question:blur', function(childView) {
          prevFaq = childView; // enregistrer la question comme question précédente
        }).
        bind('question:change', function(childView) {
          // enregistrer la question saisie
          childView.model.set('question', childView.$el.find('[name=question]').val());
        }).bind('question:remove', function(childView) {
          // si elle était déjà selectionnée ou que c'est la dernière, faire disparaitre le champ de réponse et le vider
          if(childView == prevFaq) {
            $("[name=answer]").val("");
            $("[name=answer]").addClass("hide");
            $("[name=answer]").removeClass("input-fullwidth");
            prevFaq = undefined;
          }
          // supprimer l'element
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