$(function() {
	
	var Bookmark = Backbone.Model.extend({
		clear: function() {
			this.destroy();
		}
	});
	
	var Bookmailist = Backbone.Collection.extend({
		model: Bookmark,
		url: '/bookmarks'
	});
	
	var Bookmarks = new Bookmailist;
	
	var BookmarkView = Backbone.View.extend({
		
		tagName: 	"li",

		template: "<a href='<%= url %>'><%= title %></a><span class='delete symbol'>u</span>",

		events: {
			"click .delete" : "delete",
		},
		
		initialize: function() {
      this.model.bind('destroy', this.remove, this);
    },

		render: function() {
			$(this.el).html(_.template(this.template, this.model.attributes));
	    return this;
    },

		delete: function() {
			console.log("delete");
		}
	});
	
	var AppView = Backbone.View.extend({
		
		el: $("#bookmailist-app"),
		
		events: {
		},
		
		initialize: function() {
			Bookmarks.bind('add', 	this.addOne, this);
			Bookmarks.bind('reset', this.addAll, this);
			Bookmarks.bind('all', 	this.render, this);
			Bookmarks.fetch();
		},
		
		render: function() {
		},
		
		addOne: function(bookmark) {
			var view = new BookmarkView({model: bookmark});
			var el = view.render().el;
			this.$("#bookmailist").append(el);
		},
		
		addAll: function() {
			Bookmarks.each(this.addOne);
		},
		
		saveBookmark: function() {
			Bookmarks.create({components: getRgbaComponentsDecimal()});
		},
		
		clearBookmarks: function() {
			$(Bookmarks.models).each(function(bookmark) {
				this.clear();
			});
		}
		
	});
	
	var App = new AppView;
});