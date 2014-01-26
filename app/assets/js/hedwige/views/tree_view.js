define(['cytoscape.js-2.0.2/cytoscape'],
function(Cytoscape) {

  var TreeView = Backbone.View.extend({

    // element is a jQuery element
    initialize: function(element) {
      this.element = element;
      this.build();
      this.cy = this.element.cytoscape("get");
      this.updateStyle();
      this.cy.on('tap', 'node', this.select_node);
      this.cy.on('tap', this.unfade_nodes);
    },

    build: function() {
      this.element.cytoscape({

        layout: {
          name: 'breadthfirst',
          fit: true//, // whether to fit to viewport
          //padding: 60 // padding on fit
          },
        
        ready: function(){
          window.cy = this;
          
          cy.elements().unselectify();
          cy.zoomingEnabled(true);
          cy.panningEnabled(true);
          cy.boxSelectionEnabled(false);
        }
      });
    },

    updateStyle: function(){
      this.cy.style()
        .resetToDefault()
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
            })
          .update()
    },

    select_node: function(e){
      var node = e.cyTarget; 
      var neighborhood = node.neighborhood().add(node);
      
      this.cy().elements().addClass('faded');
      neighborhood.removeClass('faded');      
    },

    unfade_nodes: function(e){
      if( e.cyTarget === this ){
        this.elements().removeClass('faded');
      }      
    },

    load_data: function() {
      var cy = this.cy
      $.getJSON('/data/stage_tree', function(elements) {
        window.elements = elements;
        cy.load( elements );
      });
    }
  });

  return TreeView;
});