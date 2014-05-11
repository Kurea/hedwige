define([
  'backbone', 'hedwige/models/stage',
  'hedwige/views/faqs/collection_view', 
  'hedwige/collections/stage_references_collection', 
  'template/stage_edit', 'hedwige/views/tree_view', 'hedwige/views/stage_form_view',
  'chosen.jquery'],
function(
  Backbone, Stage, FaqsCollectionView, 
  StageReferencesCollection,
  templateStageEdit, TreeView, StageFormView) {

  var StageEditView = Backbone.View.extend({
    
    id: 'stage-edit',

    template: templateStageEdit,

    partialSelect: '<option value="<%= key %>"><%= title %> (<%= key %>)</option>',

    events: {
      'click #faqs-add': 'clickAddFaq',
      'click #view-tree': 'clickViewTree',
      'click #activate-form': 'clickActivateForm'      
    },

    initialize: function(options) {
      _.bindAll(this, 'render');

      this.stageReferences = new StageReferencesCollection();
      this.stageReferences.bind('reset', this.updateStageReferences, this);
      this.stageReferences.fetch();

      if (this.model == undefined)
      {
        this.model = new Stage();
      }

      this.faqsCollectionView = new FaqsCollectionView({
        collection: this.model.faqs
      });

    },

    render: function() {
      //this.$el.html(this.template(_.extend(this.model.toJSON(), {stageReferences: this.stageReferences})));
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

    updateStageReferences: function() {
      var that = this;
      _.each(this.$el.find('select'), function(select) {
        $(select).append(_.template(that.partialSelect,{key: 'null', title: "Aucune"}));
        that.stageReferences.each(function(stageReference) {
          $(select).append(_.template(that.partialSelect, stageReference.toJSON()));
        });
        debugger
        valueSelected = that.model.get($(select).attr('name'));
        if ((valueSelected == undefined) || (valueSelected == null))
        {
          // si il n'y a pas d'étape précédente, selectionner Aucune
          // undefined : cas de la création d'une étape
          // null cas de la permière ou de la dernière étape
          valueSelected = 'null' 
        }
        else if (typeof(valueSelected) != 'string')
        {
          // si valueSelected n'est pas une string (cas des structures pour l'étape suivante)
          // alors, récupérer l'élément par defaut : ici le dernier
          valueSelected = valueSelected[valueSelected.length-1]['key']
        }

        $(select).find('[value=' + valueSelected +"]").first().attr('selected', true);

        $(select).chosen({search_contains: true});
      });
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