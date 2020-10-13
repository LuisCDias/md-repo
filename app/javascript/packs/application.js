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
	loadSubjects();

	loadSystems();

	loadTopics();

	$('.btn-search').on('click', function() {
		const urlParams = new URLSearchParams(window.location.search);
		if(urlParams.get("search")) {
			location.reload();
		}
		else {
			window.location = window.location.search + "&search=true";
		}
	})
});

function loadSubjects() {
	var subjects = document.querySelector('[data-trigger-subject]')
	new Choices(subjects, { searchEnabled: false, itemSelectText: '' });
	subjects.addEventListener('choice', function(choice) {
		// if(choice.detail.choice.value == "Subject") return false;

		var queryString = window.location.search;
		var queryParams = "?subject=";
		goToLocation(queryParams, choice.detail.choice.value);
	}, false);
	subjects.remove();
}

function loadSystems() {
	var systems = document.querySelector('[data-trigger-system]')
	if(systems != undefined) {
		new Choices(systems, { searchEnabled: true, itemSelectText: '' });
		systems.addEventListener('choice', function(choice) {
			// if(choice.detail.choice.value == "System") return false;

			const urlParams = new URLSearchParams(window.location.search);
			if(urlParams.get('subject') && urlParams.get('subject') != 'Subject') {
				var queryParams = "?subject=" + encodeURIComponent(urlParams.get('subject')) + "&system=";
			}
			else {
				var queryParams = "?system=";
			}

			goToLocation(queryParams, choice.detail.choice.value);
		}, false);
		systems.remove();
	}
}

function loadTopics() {
	var topics = document.querySelector('[data-trigger-topic]')
	if(topics != undefined) {
		new Choices(topics, { searchEnabled: true, itemSelectText: '' });
		topics.addEventListener('choice', function(choice) {
			// if(choice.detail.choice.value == "Topic") return false;

			const urlParams = new URLSearchParams(window.location.search);

			if(urlParams.get('subject') && urlParams.get('subject') != 'Subject') {
				if(urlParams.get('system') && urlParams.get('system') != 'System') {
					var queryParams = "?subject=" + encodeURIComponent(urlParams.get('subject')) +
														"&system=" + encodeURIComponent(urlParams.get('system')) + "&topic=";
				}
				else {
					var queryParams = "?subject=" + encodeURIComponent(urlParams.get('subject')) + "&topic=";
				}
			}
			else {
				if(urlParams.get('system') && urlParams.get('system') != 'System') {
					var queryParams = "?system=" + encodeURIComponent(urlParams.get('system')) + "&topic=";
				}
				else {
					var queryParams = "?topic=";
				}
			}
			goToLocation(queryParams, choice.detail.choice.value);
		}, false);
		topics.remove();
	}
}

function goToLocation(queryParams, choice) {
	window.location = queryParams += encodeURIComponent(choice);
}
