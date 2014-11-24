'use strict';

//
// LOAD DATA
// ---------
var products = new Products();
var items = new Items();

//
// ROUTER
// ------
var Router = Parse.Router.extend({
	routes: {
		''										: 'renderHome',
		'/#'									: 'renderHome',
		'products'						: 'renderProducts',
		'products/:productId' : 'renderProduct',
		'items'								: 'renderItems',
		'items/:itemId'				: 'renderItem',
		'admin'								: 'renderAdmin',
		'login'								: 'renderLogin'
	},

	initialize: function() {
		this.navOptions = null;
		this.currentView = null;
	},

	renderHome: function() {
		this.swapView(new HomeView());
	},

	renderProducts: function() {
		this.swapView(new ProductsView());
	},

	renderProduct: function(productId) {
		this.swapView(new ProductView(productId));
	},

	renderItems: function() {
		this.swapView(new ItemsView());
	},

	renderItem: function(itemId) {
		this.swapView(new ItemView(itemId));
	},

	renderAdmin: function() {
		if (Parse.User.current()) {
			this.swapView(new AdminView());
		} else {
			router.navigate('/#');
		}
	},

	renderLogin: function() {
		this.swapView(new LoginView());
	},

	swapView: function (view) {
		if (this.currentView) {
			this.currentView.remove();
		}

		this.currentView = view;

		$('.mountains').removeClass('mountains-shown', 1000);

		setTimeout(function() {
			if ($(document).height() - 70 <= $(window).height()) {
				$('.mountains').addClass('mountains-shown', 1000);
		  } else {
		  	$('.mountains').removeClass('mountains-shown', 1000);
			}
		}, 1000);
	}
});
