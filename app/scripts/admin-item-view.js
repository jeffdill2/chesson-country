'use strict';

var AdminItemView = Parse.View.extend({
	className: 'admin-item-view-container slidable-view',

	events: {
		'click #upload-image'			 : 'uploadImage',
		'click #save-item-changes' : 'saveItemChanges',
		'click #cancel-changes' 	 : 'redirectBack'
	},

	template: _.template($('#admin-item-view-template').text()),

	initialize: function(itemId) {
		$('.view-container').append(this.el);
		this.render(itemId, true);
	},

	render: function(itemId, useSlideAnimation) {
		useSlideAnimation = typeof useSlideAnimation !== 'undefined' ? useSlideAnimation : false;
		var _this = this;
		var itemQuery = new Parse.Query('Item');
		var productQuery = new Parse.Query('Product');

		itemQuery.equalTo('objectId', itemId);
		itemQuery.include('product');

		productQuery.find({
			success: function(products) {
				itemQuery.find({
					success: function(items) {
						var template = _this.template({
							products: products,
							item: 		items[0]
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
	},

	uploadImage: function() {
		$('#image-file-selector').click();
	},

	saveItemChanges: function(click) {
		var _this = this;
		var itemId = click.target.dataset.itemId;
		var imageFile = $('#image-file-selector')[0].files[0];
		var imageFileName = imageFile ? imageFile.name : null;
		var imageName = $('#image-name').val();
		var parseImageFile = new Parse.File(imageFileName, imageFile);
		var itemName = $('#item-name').val();
		var itemDescription = $('#item-description').val().replace(/\r?\n/g, '<br />');
		var itemProductCategory = $('#item-product-category').val();
		var itemProductCategoryId = $('#item-product-category').children(':selected').attr('id');
		var itemQuantity = parseInt($('#item-quantity').val());
		var itemPrice = parseFloat($('#item-price').val());
		var itemFeatured = $('#item-featured').val() === "YES" ? true : false;
		var itemQuery = new Parse.Query('Item');
		var itemProductCategoryPointer = {
			__type: 	 "Pointer",
			className: 'Product',
			objectId:  itemProductCategoryId
		}

		if (itemName === "" || itemDescription === "" || !(itemQuantity > 0) || !itemProductCategory || (!imageFile && !imageName) || !(itemPrice > 0)) {
			return sweetAlert('Oops!', 'Looks like you forgot to enter some item info.', 'error');
		}

		$('#save-item-changes').text('Saving Changes...');
		$('#save-item-changes').attr('disabled', true);

		var itemUpdates = {
			name: 			 itemName,
			description: itemDescription,
			quantity: 	 itemQuantity,
			featured: 	 itemFeatured,
			product: 		 itemProductCategoryPointer,
			price: 			 itemPrice
		}

		if (imageFileName) {
			itemUpdates.image = parseImageFile;
		}

		itemQuery.get(itemId, {
			success: function(item) {
				item.set(itemUpdates).save({
					success: function() {
						sweetAlert('Success!', 'Your item has been updated.', 'success');

						_this.redirectBack();
						CHESSON_COUNTRY_GLOBALS.itemsDropdownView.render();
					},
					error: function(error) {
						sweetAlert('Oops!', 'Your item was unable to be updated.', 'error');

						_this.redirectBack();

						console.log('Error ' + error.code + " : " + error.message);
						console.log('Error ' + error);
					}
				});
			},
			error: function(error) {
				console.log(error);
			}
		});
	},

	redirectBack: function() {
		router.navigate('/#admin');
	}
});