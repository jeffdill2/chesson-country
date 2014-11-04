'use strict';

//
// INITIALIZE PARSE
// ----------------
Parse.initialize('Jhy8OKg078ZS0kqcovgTUTOWGVR24uLBaAbgVWr1','5YB6DJc5NNwAbp73polr1FpMRmO37VDdgaJDgGWt');

//
// INITIALIZE ROUTER
// -----------------
var router = new Router();
Parse.history.start();

//
// INITIALIZE APPLICATION
// ----------------------
$(document).ready(function() {
	$('#header-login-button').on('click', function() {
		if (Parse.User.current) {
			router.navigate('/#admin');
		} else {
			router.navigate('/#login');
		}
	});

	$('.logo').on('click', function() {
		router.navigate('/#');
	});
});
