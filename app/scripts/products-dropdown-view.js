'use strict';

var ProductsDropdownView = Parse.View.extend({
	id: 'products-dropdown',

	className: 'dropdown',

	tagName: 'li',

	events: {

	},

	template: _.template($('#products-dropdown-view-template').text()),

	initialize: function() {
		$('#navbar-dropdowns').append(this.el);
		this.render();
	},

	render: function() {
		var _this = this;
		var query = new Parse.Query('Product');

		query.limit(5);

		query.find({
			success: function(products) {
				_this.$el.html(_this.template({products: products}));
			},
			error: function(error) {
				console.log(error);
			}
		});
	}
});
