'use strict';

var AdminView = Parse.View.extend({
	className: 'admin-view-container',

	events: {
		'click #logout-button' 	 					: 'logout',
		'click #add-new-product' 					: 'addNewProduct',
		'click #add-new-item' 	 					: 'addNewItem',
		'click #upload-image'							: 'uploadImage',
		'click .delete-product'						: 'deleteProduct',
		'click .edit-product' 						: 'editProduct',
		'click .update-product' 					: 'updateProduct',
		'click .cancel-product-update'  	: 'resetProductButtons',
		'click .delete-item'							: 'deleteItem',
		'click .edit-item' 								: 'editItem',
		'keypress #product-name' 					: 'productKeypress',
		'keypress #product-description' 	: 'productKeypress',
		'keypress #item-name'							: 'itemKeypress',
		'keypress #item-description'			: 'itemKeypress',
		'keypress #item-product-category' : 'itemKeypress',
		'keypress #item-price' 						: 'itemKeypress',
		'keypress #item-quantity' 				: 'itemKeypress',
		'keypress #item-featured' 				: 'itemKeypress'
	},

	template: _.template($('#admin-view-template').text()),

	initialize: function() {
		$('.view-container').append(this.el);
		this.render();
	},

	render: function() {
		var _this = this;
		var productQuery = new Parse.Query('Product');
		var itemQuery = new Parse.Query('Item');

		productQuery.find({
			success: function(products) {
				itemQuery.find({
					success: function(items) {
						_this.$el.html(_this.template({
							products: products,
							items: 		items
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
		var _this = this;

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

				_this.render();
			},
			error: function() {
				sweetAlert('Oops!', 'New product was unable to be created', 'error');

				console.log('Error ' + error.code + " : " + error.message);
				console.log('Error ' + error);
			}
		});
	},

	addNewItem: function() {
		var _this = this;
		var imageFile = $('#image-file-selector')[0].files[0];
		var imageFileName = imageFile ? imageFile.name : null;
		var parseImageFile = new Parse.File(imageFileName, imageFile);
		var itemName = $('#item-name').val();
		var itemDescription = $('#item-description').val();
		var itemProductCategory = $('#item-product-category').val();
		var itemProductCategoryId = $('#item-product-category').children(':selected').attr('id');
		var itemQuantity = parseInt($('#item-quantity').val());
		var itemPrice = parseFloat($('#item-price').val());
		var itemFeatured = $('#item-featured').val() === "YES" ? true : false;
		var item = new Item();
		var itemProductCategoryPointer = {
			__type: 	 "Pointer",
			className: 'Product',
			objectId:  itemProductCategoryId
		}

		if (itemName === "" || itemDescription === "" || !(itemQuantity > 0) || !itemProductCategory || !imageFile || !(itemPrice > 0)) {
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

				_this.render();
			},
			error: function(error) {
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
	},

	deleteProduct: function(click) {
		var _this = this;
		var productId = click.target.dataset.productId;
		var productQuery = new Parse.Query('Product');
		var itemQuery = new Parse.Query('Item');
		var itemProductCategoryPointer = {
			__type: 	 "Pointer",
			className: 'Product',
			objectId:  productId
		}

		itemQuery.equalTo('product', itemProductCategoryPointer);

		productQuery.get(productId, {
			success: function(product) {
				itemQuery.find({
					success: function(items) {
						var itemsCount = items.length

						if (itemsCount > 0) {
							sweetAlert({
								title: "Are you sure?",
								text: "You will not be able to recover this product!",
								type: "warning",
								showCancelButton: true,
								confirmButtonColor: "#DD6B55",
								confirmButtonText: "Yes, delete it!",
								closeOnConfirm: false
							}, function() {
								sweetAlert({
									title: "Delete Items as well?",
									text: "There are currently " + itemsCount.toString() + " items associated with this Product. Would you like to delete those as well?",
									type: "info",
									showCancelButton: true,
									confirmButtonColor: "#DD6B55",
									confirmButtonText: "Yes, delete the items!",
									cancelButtonText: "No, keep the items!",
									closeOnConfirm: false
								}, function(isConfirm) {
									product.destroy();

									if (isConfirm) {
										items.forEach(function(item) {
											item.destroy();
										});
									}

									_this.render();

									swal("Deleted!", "This product has been successfully removed.", "success");
								});
							});
						} else {
							sweetAlert({
								title: "Are you sure?",
								text: "You will not be able to recover this product!",
								type: "warning",
								showCancelButton: true,
								confirmButtonColor: "#DD6B55",
								confirmButtonText: "Yes, delete it!",
								closeOnConfirm: false
							}, function() {
								product.destroy();

								_this.render();

								swal("Deleted!", "This product has been successfully removed.", "success");
							});
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

	editProduct: function(click) {
		var productId = click.target.dataset.productId;
		var saveGlyphicon = '&nbsp;&nbsp;<span class="glyphicon glyphicon-floppy-disk"></span>';
		var cancelGlyphicon = '&nbsp;&nbsp;<span class="glyphicon glyphicon-ban-circle"></span>';
		var $nameElement = $($('#edit-product-' + productId).parents('tr').children('td')[0]);
		var $descriptionElement = $($('#edit-product-' + productId).parents('tr').children('td')[1]);

		$nameElement.html('<input id="edit-product-name" type="text" value="' + $nameElement.text() + '" data-original-value="' + $nameElement.text() + '">');
		$descriptionElement.html('<input id="edit-product-description" type="text" value="' + $descriptionElement.text() + '" data-original-value="' + $descriptionElement.text() + '">');

		$('#edit-product-' + productId).removeClass('edit-product');
		$('#edit-product-' + productId).removeClass('btn-info');
		$('#edit-product-' + productId).addClass('update-product');
		$('#edit-product-' + productId).html('Save Update' + saveGlyphicon);

		$('#delete-product-' + productId).removeClass('delete-product');
		$('#delete-product-' + productId).addClass('cancel-product-update');
		$('#delete-product-' + productId).html('Cancel Update' + cancelGlyphicon);
	},

	updateProduct: function(click) {
		var productId = click.target.dataset.productId;
		var query = new Parse.Query('Product');
		var productName = $('#edit-product-' + productId).parents('tr').find('input')[0].value;
		var productDescription = $('#edit-product-' + productId).parents('tr').find('input')[1].value;

		query.get(productId, {
			success: function(product) {
				product.set('name', productName);
				product.set('description', productDescription);

				product.save({
					success: function() {
						sweetAlert('Success!', 'The product has been updated.', 'success');
					},
					error: function(error) {
						sweetAlert('Oops!', 'The product was unable to be updated.', 'error');
						console.log(error);
					}
				});
			},
			error: function(error) {
				sweetAlert('Oops!', 'The product was unable to be updated.', 'error');
				console.log(error);
			}
		});

		$('.cancel-product-update#delete-product-' + productId).click();

		$($('#edit-product-' + productId).parents('tr').children('td')[0]).html(productName);
		$($('#edit-product-' + productId).parents('tr').children('td')[1]).html(productDescription);
	},

	resetProductButtons: function(click) {
		var productId = click.target.dataset.productId;
		var editGlyphicon = '&nbsp;&nbsp;<span class="glyphicon glyphicon-pencil"></span>';
		var deleteGlyphicon = '&nbsp;&nbsp;<span class="glyphicon glyphicon-trash"></span>';
		var productName = $('#edit-product-' + productId).parents('tr').find('input')[0].dataset.originalValue;
		var productDescription = $('#edit-product-' + productId).parents('tr').find('input')[1].dataset.originalValue;

		$($('#edit-product-' + productId).parents('tr').children('td')[0]).html(productName);
		$($('#edit-product-' + productId).parents('tr').children('td')[1]).html(productDescription);

		$('#edit-product-' + productId).removeClass('update-product');
		$('#edit-product-' + productId).addClass('btn-info');
		$('#edit-product-' + productId).addClass('edit-product');
		$('#edit-product-' + productId).html('Edit Product' + editGlyphicon);

		$('#delete-product-' + productId).addClass('delete-product');
		$('#delete-product-' + productId).removeClass('cancel-product-update');
		$('#delete-product-' + productId).html('Delete Product' + deleteGlyphicon);
	},

	deleteItem: function(click) {
		var itemId = click.target.dataset.itemId;
		var query = new Parse.Query('Item');

		query.get(itemId, {
			success: function(item) {
				sweetAlert({
					title: "Are you sure?",
					text: "You will not be able to recover this item!",
					type: "warning",
					showCancelButton: true,
					confirmButtonColor: "#DD6B55",
					confirmButtonText: "Yes, delete it!",
					closeOnConfirm: false
				}, function() {
					item.destroy();
					$('#delete-item-' + itemId).parents('tr').remove();

					sweetAlert("Deleted!", "This item has been successfully removed.", "success");
				});
			},
			error: function(error) {
				console.log(error);
			}
		});
	},

	editItem: function(click) {
		var itemId = click.target.dataset.itemId;

		router.navigate('/#admin/item/' + itemId);
	}
});
