'use strict';

//
// PRODUCT MODEL
// -------------
var Product = Parse.Object.extend({
	className: "Product"
});

//
// PRODUCT COLLECTION
// ------------------
var Products = Parse.Collection.extend({
	model: Product
});