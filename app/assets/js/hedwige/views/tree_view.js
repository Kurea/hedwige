define(['cytoscape.js-2.0.2/cytoscape'],
function(Cytoscape) {

  var TreeView = Backbone.View.extend({

    initialize: function(element) {
      this.element = element;
    },

    // element is a jQuery element
    build: function() {
      this.element.cytoscape({
        
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
          fit: true//, // whether to fit to viewport
          //padding: 60 // padding on fit
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
    }
  });

  return TreeView;
});