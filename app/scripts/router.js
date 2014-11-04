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

	loadImages: function() {

	},

	renderHome: function() {
		this.swapView(new HomeView());
	},

	renderProducts: function() {
		this.swapView(new ProductsView());
	},

	renderProduct: function(productId) {

	},

	renderItems: function() {

	},

	renderItem: function(itemId) {

	},

	renderAdmin: function() {
		this.swapView(new AdminView());
	},

	renderLogin: function() {
		this.swapView(new LoginView());
	},

	swapView: function (view) {
		if (this.currentView) {
			this.currentView.remove();
		};

		this.currentView = view;
	}
});
