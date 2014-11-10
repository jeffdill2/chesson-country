"use strict";

var LoginView = Parse.View.extend({
	className: "login-view-container",

	events: {
		'click #login-button'					 : 'login',
		'keypress #username-input-box' : 'keypress',
		'keypress #password-input-box' : 'keypress'
	},

	template: _.template($('#login-view-template').text()),

	initialize: function(options) {
		$('.view-container').html(this.el);
		this.render();
	},

	render: function() {
		var renderedTemplate = this.template;
		this.$el.html(renderedTemplate);
	},

	login: function() {
		var username = $('#username-input-box').val();
		var password = $('#password-input-box').val();

		if (username.length > 0 && password.length > 0) {
			Parse.User.logIn(username, password, {
				success: function() {
					$('#header-login-button a').text('Admin');
					router.navigate('/#admin');
				},
				error: function(error) {
					sweetAlert('Oops!', 'Looks like you\'ve entered the wrong username or password.', 'error');
				}
			});
		} else {
			sweetAlert('Oops!', 'Looks like you forgot to enter a username and password.', 'error');
		}
	},

	keypress: function(key) {
		if (key.which === 13) {
			this.login();
		}
	}
});
