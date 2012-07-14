$(function() {
	
	window.Stage = Backbone.Model.extend({
		urlRoot: '/stages',

		initialize: function() {
			this.fetch();
		}
	});
	
	window.StageView = Backbone.View.extend({
		
		tagName: 	'div',

		template: _.template($('#template-stage').html()),

		events: {
		},
		
		initialize: function() {
      //this.model.bind('destroy', this.remove, this);
    },

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
	    return this;
    }
	});
	
	var AppView = Backbone.View.extend({
		
		el: $("#app"),
		
		events: {
		},
		
		initialize: function() {
			/*Stages.bind('add', 	this.addOne, this);
			Stages.bind('reset', this.addAll, this);
			Stages.bind('all', 	this.render, this);*/
			//Stages.fetch();
			this.fetchStage(1);
		},
		
		fetchStage: function(id) {
			this.stage = new Stage({id: id});
			this.stage.bind('change', this.renderStage, this);
		},

		renderStage: function() {
			var view = new StageView({model: this.stage});
			this.$('#stage').append(view.render().el);
		}
		
	});
	
	window.App = new AppView;
});