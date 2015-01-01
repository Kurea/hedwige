requirejs.config({
  // By default load any module IDs from js
  baseUrl: '/vendors',

  // except, if the module ID starts with "app",
  // load it from the js/app directory. paths
  // config is relative to the baseUrl, and
  // never includes a ".js" extension since
  // the paths config could be for a directory.
  paths: {
    hedwige:  '/js/hedwige',
    lib:      '/js/lib',
    showdown: '/js/vendor/showdown/src/showdown',
    cytoscape: '/js/vendor/cytoscape.js-2.0.2/cytoscape',
    template: '/jst',
    backbone: 'backbone/backbone',
    bootstrap: 'bootstrap/dist/js/bootstrap',
    chosen: 'chosen/chosen.jquery',
    jquery: 'jquery/dist/jquery',
    marionette: 'marionette/lib/backbone.marionette',
    underscore: 'underscore/underscore'
  },

  // to support traditional "browser globals" scripts (jQuery, Underscore, Backbone)
  shim: {
    'jquery': {
      exports: '$'
    },
    'bootstrap': {
      deps: ['jquery']
    },
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'showdown': {
      exports: 'Showdown'
    },
    'chosen': {
      //exports: 'chosen.jquery',
      deps: ['jquery']
    },
    'marionette': {
      exports: 'Marionette',
      deps: ['backbone']
    },
    'cytoscape': {
      deps: ['jquery']
    }
  }
});

// Start the main app logic.
requirejs(
  [ "require.deps!hedwige/app" ],
//require([
//  'hedwige/app'
//], 
function (App) {
  $(function() {
    window.App = new App;
  }); 
});