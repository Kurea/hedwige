define(['marionette'],
function(Marionette) {

  var AutoUpdateItemView = Marionette.ItemView.extend({


    initialize: function() {
      Marionette.ItemView.prototype.initialize.call(this);
      _.bindAll(this, 'beforeRender', 'render', 'afterRender', 'updateModel');
      var that = this;
      this.render = _.wrap(this.render, function(render) {
        that.beforeRender();
        render();
        that.afterRender();
        return that;
      });
    },
    
    beforeRender: function() {

    },

    afterRender: function() {

      var fullSelector
      if (this.autoUpdateSelector == undefined)
      {
        fullSelector = 'input, select';
      }
      else
      {
        fullSelector = this.autoUpdateSelector + ' input, ' + this.autoUpdateSelector + ' select';
      }
      this.$el.find(fullSelector).on('change', this.updateModel);
    },

    updateModel: function(event) {
      var field = $(event.currentTarget);
      var value = field.val();
      var data = field.attr('name');
      this.model.set(data, value);
    }

  });

  return AutoUpdateItemView;
});