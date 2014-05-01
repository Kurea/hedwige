requirejs.config({
  // By default load any module IDs from js
  baseUrl: '/js/vendor',

  // except, if the module ID starts with "app",
  // load it from the js/app directory. paths
  // config is relative to the baseUrl, and
  // never includes a ".js" extension since
  // the paths config could be for a directory.
  paths: {
    hedwige:  '/js/hedwige',
    lib:      '/js/lib',
    showdown: 'showdown/src/showdown',
    template: '/jst'
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
    'chosen.jquery': {
      deps: ['jquery']
    }
  }
});

// Start the main app logic.
requirejs(
  [ "require.deps!hedwige/app" ],

function (App) {
  $(function() {
    window.App = new App;
  }); 
});