'use strict';

var HomeView = Parse.View.extend({
	className: 'home-view-container slidable-view',

	events: {

	},

	template: _.template($('#home-view-template').text()),

	initialize: function() {
		$('.view-container').append(this.el);
		this.render(true);
	},

	render: function(useSlideAnimation) {
		useSlideAnimation = typeof useSlideAnimation !== 'undefined' ? useSlideAnimation : false;
		var _this = this;
		var query = new Parse.Query('Item');

		query.include('product');
		query.include('photo');
		query.equalTo("featured", true);

		query.find({
			success: function(results) {
				var featuredItems = {items: results};
				var template = _this.template(featuredItems);

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
