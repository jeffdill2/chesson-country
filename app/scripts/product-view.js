'use strict';

var ProductView = Parse.View.extend({
	className: 'product-view-container slidable-view',

	events: {

	},

	template: _.template($('#product-view-template').text()),

	initialize: function(productId) {
		$('.view-container').append(this.el);
		this.render(productId, true);
	},

	render: function(productId, useSlideAnimation) {
		useSlideAnimation = typeof useSlideAnimation !== 'undefined' ? useSlideAnimation : false;
		var _this = this;
		var itemQuery = new Parse.Query('Item');
		var productQuery = new Parse.Query('Product');
		var product = {
			__type: "Pointer",
			className: 'Product',
			objectId: productId
		}

		itemQuery.equalTo('product', product);

		itemQuery.find({
			success: function(results) {
				productQuery.get(productId, {
					success: function(product) {
						var template = _this.template({
							items: 	 		 results,
							productName: product.get('name')
						});

						if (useSlideAnimation) {
							_this.slideIn(template, _this.$el);
						} else {
							_this.$el.html(template);
						}
					},
					error: function(error) {
						console.log(error);
					}
				});
			},
			error: function(error) {
				console.log(error);
			}
		});
	}
});
