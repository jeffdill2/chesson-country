'use strict';

var ProductsView = Parse.View.extend({
	className: 'products-view-container slidable-view',

	events: {

	},

	template: _.template($('#products-view-template').text()),

	initialize: function() {
		$('.view-container').append(this.el);
		this.render(true);
	},

	render: function(useSlideAnimation) {
		useSlideAnimation = typeof useSlideAnimation !== 'undefined' ? useSlideAnimation : false;
		var _this = this;
		var query = new Parse.Query('Product');

		query.find({
			success: function(results) {
				var template = _this.template({products: results});

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
