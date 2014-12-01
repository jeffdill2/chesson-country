'use strict';

var ItemsView = Parse.View.extend({
	className: 'items-view-container',

	events: {

	},

	template: _.template($('#items-view-template').text()),

	initialize: function() {
		$('.view-container').append(this.el);
		this.render();
	},

	render: function() {
		var _this = this;
		var query = new Parse.Query('Item');

		query.find({
			success: function(items) {
				_this.$el.html(_this.template({items: items}));
			},
			error: function(error) {
				console.log(error);
			}
		});
	}
});
