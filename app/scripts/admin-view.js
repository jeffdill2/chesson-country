'use strict';

var AdminView = Parse.View.extend({
	className: 'admin-view-container',

	events: {
		'click #logout-button' 	 				: 'logout',
		'click #add-new-product' 				: 'addNewProduct',
		'click #add-new-item' 	 				: 'addNewItem',
		'click #upload-image'						: 'uploadImage',
		'keypress #product-name' 				: 'productKeypress',
		'keypress #product-description' : 'productKeypress',
		'keypress #item-name'						: 'itemKeypress',
		'keypress #item-description'		: 'itemKeypress'
	},

	template: _.template($('#admin-view-template').text()),

	initialize: function() {
		$('.view-container').append(this.el);
		this.render();
	},

	render: function() {
		var _this = this;
		var query = new Parse.Query('Product');

		query.find({
			success: function(results) {
				_this.$el.html(_this.template({products: results}));
			},
			error: function(error) {
				console.log(error);
			}
		});
	},

	logout: function() {
		Parse.User.logOut();
		$('#header-login-button a').text('Login');
		router.navigate('/#login');
	},

	addNewProduct: function() {
		var productName = $('#product-name').val();
		var productDescription = $('#product-description').val();
		var product = new Product();

		if (productName === "" || productDescription === "") {
			return sweetAlert('Oops!', 'Looks like you forgot to enter the name or description.', 'error');
		}

		product.save({
			name: 			 productName,
			description: productDescription
		}, {
			success: function() {
				sweetAlert('Success!', 'Your new product has been created.', 'success');

				$('#product-name').val('');
				$('#product-description').val('');
			},
			error: function() {
				sweetAlert('Oops!', 'New product was unable to be created', 'error');

				console.log('Error ' + error.code + " : " + error.message);
				console.log('Error ' + error);
			}
		});
	},

	addNewItem: function() {
		var imageFile 								 = $('#image-file-selector')[0].files[0];
		var imageFileName 						 = imageFile ? imageFile.name : null;
		var parseImageFile			  		 = new Parse.File(imageFileName, imageFile);
		var itemName 									 = $('#item-name').val();
		var itemDescription 					 = $('#item-description').val();
		var itemProductCategory 			 = $('#item-product-category').val();
		var itemProductCategoryId  		 = $('#item-product-category').children(':selected').attr('id');
		var itemQuantity 					 		 = parseInt($('#item-quantity').val());
		var itemPrice 								 = parseInt($('#item-price').val());
		var itemFeatured 							 = $('#item-featured').val() === "YES" ? true : false;
		var item 											 = new Item();
		var itemProductCategoryPointer = {
			__type: "Pointer",
			className: 'Product',
			objectId: itemProductCategoryId
		}

		if (itemName === "" || itemDescription === "" || !(itemQuantity > 0) || itemProductCategory === "" || !imageFile) {
			return sweetAlert('Oops!', 'Looks like you forgot to enter some item info.', 'error');
		}

		$('#add-new-item').text('Adding Item...');
		$('#add-new-item').attr('disabled', true);

		item.save({
			name: 			 itemName,
			description: itemDescription,
			quantity: 	 itemQuantity,
			featured: 	 itemFeatured,
			product: 		 itemProductCategoryPointer,
			image: 			 parseImageFile,
			price: 			 itemPrice
		}, {
			success: function() {
				sweetAlert('Success!', 'Your new item has been created.', 'success');

				$('#item-name').val('');
				$('#item-description').val('');
				$('#item-quantity').val('0');
				$('#item-price').val('0');
				$('#image-name').val('');
				$('#item-product-category').children(':selected').attr('selected', false);

				$('#add-new-item').text('Add New Item');
				$('#add-new-item').attr('disabled', false);
			},
			error: function() {
				sweetAlert('Oops!', 'New item was unable to be created', 'error');

				console.log('Error ' + error.code + " : " + error.message);
				console.log('Error ' + error);
			}
		});
	},

	productKeypress: function(key) {
		if (key.which === 13) {
			this.addNewProduct();
		}
	},

	itemKeypress: function(key) {
		if (key.which === 13) {
			this.addNewItem();
		}
	},

	uploadImage: function() {
		$('#image-file-selector').click();
	}
});
