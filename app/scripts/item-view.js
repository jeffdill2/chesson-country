'use strict';

var ItemView = Parse.View.extend({
	className: 'item-view-container',

	events: {

	},

	template: _.template($('#item-view-template').text()),

	initialize: function(itemId) {
		$('.view-container').append(this.el);
		this.render(itemId);
	},

	render: function(itemId) {
		var _this = this;
		var query = new Parse.Query('Item');

		query.equalTo('objectId', itemId);

		query.find({
			success: function(results) {
				_this.$el.html(_this.template({item: results[0]}));
			},
			error: function(error) {
				console.log(error);
			}
		});
	}
});
