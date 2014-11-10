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
	if (Parse.User.current()) {
		$('#header-login-button a').text('Admin');
	} else {
		$('#header-login-button a').text('Login');
	}

	// LOGIN BUTTON
	$('#header-login-button').on('click', function() {
		if (Parse.User.current()) {
			router.navigate('/#admin');
		} else {
			router.navigate('/#login');
		}
	});

	// LOGO CLICK
	$('.logo').on('click', function() {
		router.navigate('/#');
	});

	// FEATURED ITEMS
	$('#featured-items-link').click(function() {
		if (window.location.href.replace(window.location.origin, '').length > 2) {
			router.navigate('/#');
		}

		var interval = setInterval(function() {
			if ($('#featured-items')) {
				$('html, body').animate({scrollTop: $('#featured-items').offset().top - 80}, 'slow');
				clearInterval(interval);
			}
		}, 100);
	});

	// IMAGE FILE UPLOAD
	$(document).on('change', '#image-file-selector', function() {
		$('#image-name').val($('#image-file-selector').val());
	});
});
