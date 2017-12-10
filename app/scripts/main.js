'use strict';

//
// INITIALIZE PARSE
// ----------------
Parse.initialize('rGQfoeFQ7dAwWECkxByzXycC','6jzuzBhTuZUbinpvpmJGXQUb');
Parse.serverURL = 'https://chesson-country-api.herokuapp.com';

//
// INITIALIZE ROUTER
// -----------------
var router = new Router();
Parse.history.start();

//
// GLOBAL NAMESPACE
// ----------------
var CHESSON_COUNTRY_GLOBALS = {
	productsDropdownView: {},
	itemsDropdownView: {}
};

//
// PARSE EXTENSIONS
// ----------------
Parse.View.prototype.slideIn = function(template, wrapper) {
	wrapper.html(template).show(0, function() {
  	wrapper.animate({
  		'margin-left': '0px'
  	}, 200);
	});
};

//
// INITIALIZE APPLICATION
// ----------------------
$(document).ready(function() {
	CHESSON_COUNTRY_GLOBALS.productsDropdownView = new ProductsDropdownView();
	CHESSON_COUNTRY_GLOBALS.itemsDropdownView = new ItemsDropdownView();

	// MOUNTAINS ANIMATION
	$(window).scroll(function() {
	  if ($(window).scrollTop() > ($(document).height() - $(window).height()) - 70) {
	  	$('.mountains').addClass('mountains-shown', 1000);
	  } else {
	  	$('.mountains').removeClass('mountains-shown', 1000);
	  }
	});

	// ADMIN OR LOGIN
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
	$('#featured-items-link').on('click', function() {
		if (window.location.href.replace(window.location.origin, '').length > 2) {
			router.navigate('/#');
		}

		var interval = setInterval(function() {
			if ($('#featured-items')) {
				$('html, body').animate({scrollTop: $('#featured-items').offset().top - 80}, 'slow');
				clearInterval(interval);
			}
		}, 500);
	});

	// IMAGE FILE UPLOAD
	$(document).on('change', '#image-file-selector', function() {
		$('#image-name').val($('#image-file-selector').val());
	});

	// IMAGE MODAL LIGHTBOX
	$('#lightbox').on('click', function() {
		hideLightbox();
	});
});

//
// MISC. FUNCTIONS
// ---------------
function showLightbox(image) {
	$('#lightbox img').attr('src', image);
	$('#lightbox-backdrop').slideDown(200);
	$('#lightbox').slideDown(200);
}

function hideLightbox() {
	$('#lightbox-backdrop').slideUp(200);
	$('#lightbox').slideUp(200);
}

//
// GOOGLE ANALYTICS
// ----------------
$(document).on('click', '#featured-items-link', function() {
	ga('send', {
    hitType:       'event',
    eventCategory: 'Navbar',
    eventAction:   'click',
    eventLabel:    'Featured'
  });
});

$(document).on('click', '.product-dropdown-link', function() {
	ga('send', {
    hitType:       'event',
    eventCategory: 'Navbar',
    eventAction:   'click',
    eventLabel:    'Products'
  });
});

$(document).on('click', '.item-dropdown-link', function() {
	ga('send', {
    hitType:       'event',
    eventCategory: 'Navbar',
    eventAction:   'click',
    eventLabel:    'Items'
  });
});

$(document).on('click', '.featured-item-link', function() {
	ga('send', {
    hitType:       'event',
    eventCategory: 'Item',
    eventAction:   'click',
    eventLabel:    'Featured'
  });
});

$(document).on('click', '.item-link', function() {
	ga('send', {
    hitType:       'event',
    eventCategory: 'Item',
    eventAction:   'click',
    eventLabel:    'Normal'
  });
});

$(document).on('click', '#social-links a', function() {
	ga('send', {
    hitType:       'event',
    eventCategory: 'Social',
    eventAction:   'click',
    eventLabel:    this.dataset.socialType
  });
});

$(document).on('click', '#purchase-item', function() {
	ga('send', {
    hitType:       'event',
    eventCategory: 'Email',
    eventAction:   'click',
    eventLabel:    'Purchase'
  });
});

$(document).on('click', '#request-more-info', function() {
	ga('send', {
    hitType:       'event',
    eventCategory: 'Email',
    eventAction:   'click',
    eventLabel:    'Info'
  });
});
