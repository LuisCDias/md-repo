// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")
require('jquery')
const Choices = require('choices.js')
// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)


$(document).on('turbolinks:load', function() {
	var subjects = document.querySelector('[data-trigger-subject]')
	new Choices(subjects, { searchEnabled: false, itemSelectText: 'Medicine' });
	subjects.addEventListener('choice', function(choice) {
		var queryString = window.location.search;
		var queryParams = "?subject=";
		goToLocation(queryParams, choice);
	}, false);
	subjects.remove();

	var systems = document.querySelector('[data-trigger-system]')
	if(systems != undefined) {
		new Choices(systems, { searchEnabled: true, itemSelectText: '' });
		systems.addEventListener('choice', function(choice) {
			const urlParams = new URLSearchParams(window.location.search);
			var queryParams = "?subject=" + encodeURIComponent(urlParams.get('subject')) + "&system=";
			goToLocation(queryParams, choice);
		}, false);
		systems.remove();
	}

	var topics = document.querySelector('[data-trigger-topic]')
	if(topics != undefined) {
		new Choices(topics, { searchEnabled: true, itemSelectText: '' });
		topics.addEventListener('choice', function(choice) {
			const urlParams = new URLSearchParams(window.location.search);
			// alert(urlParams.get('system'));
			var queryParams = "?subject=" + encodeURIComponent(urlParams.get('subject')) +
												"&system=" + encodeURIComponent(urlParams.get('system')) + "&topic=";
			goToLocation(queryParams, choice);
		}, false);
		topics.remove();
	}
});

function goToLocation(queryParams, choice) {
	window.location = queryParams += encodeURIComponent(choice.detail.choice.value);
}
