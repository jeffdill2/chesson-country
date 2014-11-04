'use strict';

//
// ITEM MODEL
// ----------
var Item = Parse.Object.extend({
	className: "Item"
});

//
// ITEM COLLECTION
// ---------------
var Items = Parse.Collection.extend({
	model: Item
});