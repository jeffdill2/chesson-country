'use strict';

var ProductView = Parse.View.extend({
	className: 'product-view-container',

	events: {

	},

	template: _.template($('#product-view-template').text()),

	initialize: function(productId) {
		$('.view-container').append(this.el);
		this.render(productId);
	},

	render: function(productId) {
		var _this = this;
		var query = new Parse.Query('Item');
		var product = {
			__type: "Pointer",
			className: 'Product',
			objectId: productId
		}

		query.equalTo('product', product);

		query.find({
			success: function(results) {
				_this.$el.html(_this.template({items: results}));
			},
			error: function(error) {
				console.log(error);
			}
		});
	}
});