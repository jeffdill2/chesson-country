'use strict';

var AdminView = Parse.View.extend({
	className: 'admin-view-container',

	events: {

	},

	template: _.template($('#admin-view-template').text()),

	initialize: function() {
		$('.view-container').append(this.el);
		this.render();
	},

	render: function() {
		this.$el.html(this.template);
	}
});
