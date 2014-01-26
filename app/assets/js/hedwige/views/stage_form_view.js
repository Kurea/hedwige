define([
  'backbone', 'hedwige/models/faq', 'hedwige/models/stage',
  'hedwige/collections/faqs_collection', 'hedwige/views/faqs/collection_view',
  'template/stage_form', 'hedwige/views/tree_view'],
function(
  Backbone, Faq, Stage, FaqsCollection, FaqsCollectionView,
  templateStageForm, TreeView) {

  var StageFormView = Backbone.View.extend({
    
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

      this.stage = new Stage();

      this.stage.faqs = new FaqsCollection();
      this.faqsCollectionView = new FaqsCollectionView({
        collection: this.stage.faqs
      });
    },

    render: function() {
      this.$el.html(this.template({stageReferences: this.stageReferences}));
      this.$el.append(this.faqsCollectionView.render().el);
      return this;
    },

    updateStageReferences: function() {
      var that = this;
      _.each(this.$el.find('select'), function(select) {
        $(select).append(_.template(that.partialSelect,{key: 'none', title: "Aucune"}));
        that.stageReferences.each(function(stageReference) {
          $(select).append(_.template(that.partialSelect, stageReference.toJSON()));
        });
        $(select).chosen();
      });
    },

    // -----------------
    // Respond to events

    clickAddFaq: function(event) {
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
      this.stage.faqs.add({});
    },

    save: function() {
      console.log('StageFormView#save');
      console.log(this)
      var data = {};
      _.each(this.$el.find('[name*=stage]'), function(field) {
        data[field.name] = $(field).val();
      });
      console.log(data);
      return data;
    }
  });

  return StageFormView;
});