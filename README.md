## Getting started

    git clone git@bitbucket.org:rchampourlier/hedwige.git
    git submodule init
    git submodule update
    bundle install
    bundle exec guard

Go to [http://localhost:9292](http://localhost:9292)


## To be modified in cytoscape
MooBook:Downloads claire$ diff cytoscape-cytoscape.js-f2a2cb4/build/cytoscape.js ../Documents/Developpement/hedwige/app/assets/js/vendor/cytoscape.js-2.0.2/cytoscape.js 
15816a15817,15818
>         var minDistanceW = 0;
>         var minDistanceH = 0;
15821a15824,15825
>             minDistanceW = Math.max(minDistanceW, w);
>             minDistanceH = Math.max(minDistanceH, h);
15823a15828,15829
>         minDistanceW *= 1.3;
>         minDistanceH *= 3;
15890,15891c15896,15897
<             var distanceX = Math.max( width / (depths[depth].length + 1), minDistance );
<             var distanceY = Math.max( height / (depths.length + 1), minDistance );
---
>             var distanceX = Math.max( width / (depths[depth].length + 1), minDistanceW );
>             var distanceY = Math.max( height / (depths.length + 1), minDistanceH );
MooBook:Downloads claire$ 

BreadthFirstLayout.prototype.run = function(){
[...]
        // find min distance we need to leave between nodes
        var minDistance = 0;
        var minDistanceW = 0;
        var minDistanceH = 0;
        for( var i = 0; i < nodes.length; i++ ){
            var w = nodes[i].outerWidth();
            var h = nodes[i].outerHeight();
            
            minDistance = Math.max(minDistance, w, h);
            minDistanceW = Math.max(minDistanceW, w);
            minDistanceH = Math.max(minDistanceH, h);
        }
        minDistance *= 1.75; // just to have some nice spacing
        minDistanceW *= 1.3;
        minDistanceH *= 3;

[...]

        nodes.positions(function(){
          var ele = this[0];
          var info = ele._private.scratch.BreadthFirstLayout;
          var depth = info.depth;
          var index = info.index;

          var distanceX = Math.max( width / (depths[depth].length + 1), minDistanceW );
          var distanceY = Math.max( height / (depths.length + 1), minDistanceH );
          var radiusStepSize = Math.min( width / 2 / depths.length, height / 2 / depths.length );
          radiusStepSize = Math.max( radiusStepSize, minDistance );
[...]
