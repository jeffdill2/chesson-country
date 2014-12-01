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
		var innerQuery = new Parse.Query('Item');

		query.include('product');

		query.get(itemId, {
			success: function(item) {
				var productPointer = {
					__type:    'Pointer',
					className: 'Product',
					objectId:  item.attributes.product.id
				}

				innerQuery.equalTo('product', productPointer);

				innerQuery.find({
					success: function(relatedItems) {
						_this.$el.html(_this.template({
							item: 				item,
							relatedItems: relatedItems.slice(0, 5),
							itemsCount: 	relatedItems.length
						}));
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
