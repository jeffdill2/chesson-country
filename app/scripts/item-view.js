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
		var rootURL = 'http://chessoncountry.com';
		var facebookURL = '//www.facebook.com/sharer/sharer.php';
		var twitterURL = '//twitter.com/share';
		var googlePlusURL = '//plus.google.com/share';
		var pinterestURL = '//pinterest.com/pin/create/button';
		var twitterHandle = '@ChessonCountry';

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
							item: 					item,
							relatedItems: 	relatedItems.slice(0, 5),
							itemsCount: 		relatedItems.length,
							facebookLink: 	facebookURL + '?u=' + rootURL + '/%23items/' + item.id,
							twitterLink: 		twitterURL + '?url=' + rootURL + '/%23items/' + item.id + '&text=' + item.attributes.name + '&via=' + twitterHandle,
							googlePlusLink: googlePlusURL + '?url=' + rootURL + '/%23items/' + item.id,
							pinterestLink: 	pinterestURL + '?url=' + rootURL + '/%23items/' + item.id + '&media=' + item.attributes.image._url + '&description=' + item.attributes.name + "  |  " + item.attributes.description
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
