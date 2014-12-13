'use strict';

var ItemsDropdownView = Parse.View.extend({
	id: 'items-dropdown',

	className: 'dropdown',

	tagName: 'li',

	events: {

	},

	template: _.template($('#items-dropdown-view-template').text()),

	initialize: function() {
		$('#navbar-dropdowns').append(this.el);
		this.render();
	},

	render: function() {
		var _this = this;
		var query = new Parse.Query('Item');

		query.limit(5);

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
