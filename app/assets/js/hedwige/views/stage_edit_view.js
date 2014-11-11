define([
  'backbone', 'hedwige/models/stage',
  'hedwige/views/faqs/collection_view', 'hedwige/views/next_stage/collection_view', 
  'hedwige/collections/stage_references_collection', 
  'template/stage_edit', 'hedwige/views/tree_view', 'hedwige/views/stage_form_view',
  'chosen.jquery'],
function(
  Backbone, Stage, FaqsCollectionView, NextStagesCollectionView,
  StageReferencesCollection,
  templateStageEdit, TreeView, StageFormView) {

  var StageEditView = Backbone.View.extend({
    
    id: 'stage-edit',

    template: templateStageEdit,

    partialSelect: '<option value="<%= key %>"><%= title %> (<%= key %>)</option>',

    events: {
      'click #faqs-add': 'clickAddFaq',
      'click #view-tree': 'clickViewTree',
      'click #activate-form': 'clickActivateForm',
      'click #add-condition': 'clickAddCondition',
      'change #stage_key': 'updateModel',
      'change #stage_previous': 'updateModel',
      'change #stage_title': 'updateModel',
      'change #stage_text': 'updateModel'     
    },

    initialize: function(options) {
      _.bindAll(this, 'render');

      this.stageReferences = new StageReferencesCollection();
      this.stageReferences.bind('reset', this.updateStageReferences, this);
      this.stageReferences.fetch();

      if (this.model == undefined)
      {
        // only necessary if you access directly to the new stage page 
        this.model = new Stage();
      }

      this.faqsCollectionView = new FaqsCollectionView({
        collection: this.model.faqs
      });

      this.nextStagesCollectionView = new NextStagesCollectionView({
        collection: this.model.nextStages,
        stageReferences: this.stageReferences
      });


    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      this.$el.append(this.faqsCollectionView.render().el);

      if (this.model.forms != undefined)
      {
        this.$el.find('#activate-form').attr('checked', 'true');
        this.stageFormView = new StageFormView({model: this.model.forms[0]});
        this.$el.find('#stage-form').html(this.stageFormView.render().el);
      }
      return this;
    },

    // Mise à jour des menus déroulants permettant de choisir les stages précédents/suivants
    updateStageReferences: function() {
      var that = this;
      var select = this.$el.find('select.#stage_previous').first()
      select.append(_.template(that.partialSelect,{key: 'null', title: "Aucune"}));
      that.stageReferences.each(function(stageReference) {
        select.append(_.template(that.partialSelect, stageReference.toJSON()));
      });

      // on cherche le previous normalement
      valueSelected = that.model.get(select.attr('name'));

      if ((valueSelected == undefined) || (valueSelected == null))
      {
        // si il n'y a pas d'étape précédente, selectionner Aucune
        // undefined : cas de la création d'une étape
        // null cas de la permière ou de la dernière étape
        valueSelected = 'null';
      }

      select.find('[value=' + valueSelected +"]").first().attr('selected', true);

      select.chosen({search_contains: true});
      this.$el.find('#next-stages-collection').html(this.nextStagesCollectionView.render().el);
      _.each(this.$el.find('select.stage_next'), function(select) {
        $(select).chosen({search_contains: true});
      });
      this.$el.find('.ns-next-stage-remove-zone').first().removeClass('col-sm-offset-1');
    },

    // -----------------
    // Respond to events

    clickAddFaq: function(event) {
      if (event && event.preventDefault){ event.preventDefault(); }
      this.addFaq();
      return false; // prevents the event from submitting the form
    },

    clickViewTree: function(event) {
      $("#modal-tree").removeData('modal');
      if ( this.treeView == undefined )
      {
        this.treeView = new TreeView($('#cy'));
      }
      this.treeView.load_data();

      $("#modal-tree").modal();

      return false; // prevents the event from submitting the form
    },

    clickActivateForm: function(event) {
      if ($(event.currentTarget).is(':checked'))
      {
        // Afficher l'editeur de formulaire
        this.model.createForm();
        this.stageFormView = new StageFormView({model: this.model.forms[0]});
        this.$el.find('#stage-form').html(this.stageFormView.render().el);
      }
      else
      {
        // Masquer l'editeur de formulaire
        this.model.removeForm();
        this.stageFormView.remove();
        delete this.stageFormView;
      }
    },

    clickAddCondition: function(event) {
      if (event && event.preventDefault){ event.preventDefault(); }
      this.model.nextStages.add({});
      this.$el.find('select.stage_next').last().chosen({search_contains: true});

      return false;
    },

    updateModel: function(event) {
      var field = $(event.currentTarget);
      var value = field.val();
      var data = field.attr('name');
      this.model.set(data, value);
    },

    focus: function(itemView) {
      console.log(itemView);
    },

    // -----------------
    // Manage faqs

    addFaq: function() {
      this.model.faqs.add({});
    }
  });

  return StageEditView;
});