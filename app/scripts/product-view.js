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
		var query = new Parse.Query('Item');
		var product = {
			__type: "Pointer",
			className: 'Product',
			objectId: productId
		}

		query.equalTo('product', product);

		query.find({
			success: function(results) {
				var template = _this.template({items: results});

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
	}
});
