'use strict';

var ItemsView = Parse.View.extend({
	className: 'items-view-container slidable-view',

	events: {

	},

	template: _.template($('#items-view-template').text()),

	initialize: function() {
		$('.view-container').append(this.el);
		this.render(true);
	},

	render: function(useSlideAnimation) {
		useSlideAnimation = typeof useSlideAnimation !== 'undefined' ? useSlideAnimation : false;
		var _this = this;
		var query = new Parse.Query('Item');

		query.find({
			success: function(items) {
				var template = _this.template({items: items});

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
