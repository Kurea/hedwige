define([
  'backbone', 'hedwige/models/faq', 'hedwige/models/stage',
  'hedwige/collections/faqs_collection', 'hedwige/views/faqs/collection_view',
  'template/stage_form', 'cytoscape.js-2.0.2/cytoscape'],
function(
  Backbone, Faq, Stage, FaqsCollection, FaqsCollectionView,
  templateStageForm, Cytoscape) {

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
      console.log("viewtree");
      //$('#modal-tree').data('modal').options.remote = "/test";
      $("#modal-tree").removeData('modal');
      $('#cy').cytoscape({
          style: cytoscape.stylesheet()
            .selector('node')
              .css({
                'content': 'data(name)',
                'text-valign': 'center',
                'color': 'white',
                'text-outline-width': 2,
                'text-outline-color': '#888',
                'shape': 'rectangle',
                'width': 150
              })
            .selector('edge')
              .css({
                'target-arrow-shape': 'triangle'
              })
            .selector(':selected')
              .css({
                'background-color': 'black',
                'line-color': 'black',
                'target-arrow-color': 'black',
                'source-arrow-color': 'black'
              })
             .selector('edge.default-path')
              .css({
                'width' : 2.7
              })
            .selector('.faded')
              .css({
                'opacity': 0.25,
                'text-opacity': 0
              }),
          layout: {
            name: 'breadthfirst',
            fit: true, // whether to fit to viewport
            padding: 60 // padding on fit
            },
          
          ready: function(){
            console.log('ready');
            window.cy = this;
            
            $.getJSON('/data/stage_tree', function(elements) {
                        console.log(elements);
                        window.elements = elements;
                        cy.load( elements );
                      });

            // giddy up...
            
            cy.elements().unselectify();
            cy.zoomingEnabled(true);
            cy.panningEnabled(true);
            cy.boxSelectionEnabled(false);
            
            cy.on('tap', 'node', function(e){
              var node = e.cyTarget; 
              var neighborhood = node.neighborhood().add(node);
              
              cy.elements().addClass('faded');
              neighborhood.removeClass('faded');

            });
            
            cy.on('tap', function(e){
              if( e.cyTarget === cy ){
                cy.elements().removeClass('faded');
              }

            });
          }
        });

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