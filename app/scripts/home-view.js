'use strict';

var HomeView = Parse.View.extend({
	className: 'home-view-container',

	events: {

	},

	template: _.template($('#home-view-template').text()),

	initialize: function() {
		$('.view-container').append(this.el);
		this.render();
	},

	render: function() {
		var _this = this;
		var query = new Parse.Query('Item');

		query.include('product');
		query.include('photo');
		query.equalTo("featured", true);

		query.find({
			success: function(results) {
				var featuredItems = {items: results};
				_this.$el.html(_this.template(featuredItems));
			},
			error: function(error) {
				console.log(error);
			}
		});
	}
});
