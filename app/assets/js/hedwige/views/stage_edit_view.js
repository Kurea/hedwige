define([
  'backbone', 'hedwige/models/faq', 'hedwige/models/stage',
  'hedwige/collections/faqs_collection', 'hedwige/views/faqs/collection_view',
  'template/stage_form', 'hedwige/views/tree_view',
  'chosen.jquery'],
function(
  Backbone, Faq, Stage, FaqsCollection, FaqsCollectionView,
  templateStageForm, TreeView) {

  var StageEditView = Backbone.View.extend({
    
    id: 'stage-form',

    template: templateStageForm,

    partialSelect: '<option value="<%= key %>"><%= title %> (<%= key %>)</option>',

    events: {
      'click #faqs-add': 'clickAddFaq',
      'click #view-tree': 'clickViewTree'      
    },

    initialize: function(options) {
      _.bindAll(this, 'render');

      this.stageReferences = this.options.stageReferences;
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
      return this;
    },

    updateStageReferences: function() {
      var that = this;
      _.each(this.$el.find('select'), function(select) {
        $(select).append(_.template(that.partialSelect,{key: 'null', title: "Aucune"}));
        that.stageReferences.each(function(stageReference) {
          $(select).append(_.template(that.partialSelect, stageReference.toJSON()));
        });

        valueSelected = that.model.get($(select).attr('name'));

        $(select).find('[value=' + valueSelected +"]").first().attr('selected', true);

        $(select).chosen();
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