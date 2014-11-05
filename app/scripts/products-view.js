'use strict';

var ProductsView = Parse.View.extend({
	className: 'products-view-container',

	events: {

	},

	template: _.template($('#products-view-template').text()),

	initialize: function() {
		$('.view-container').append(this.el);
		this.render();
	},

	render: function() {
		var _this = this;
		var query = new Parse.Query('Product');

		query.find({
			success: function(results) {
				_this.$el.html(_this.template({products: results}));
			},
			error: function(error) {
				console.log(error);
			}
		});
	}
});