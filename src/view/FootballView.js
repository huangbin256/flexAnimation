var d = mvdom; // external lib
var app = require("../js-app/app.js");
var route = require("../js-app/route.js");
var render = require("../js-app/render.js").render;

/**
 * View: FootballView
 */

d.register("FootballView", {
	
	create: function(data, config) {
		return render("tmpl-FootballView");
	},

	postDisplay: function(data, config){
		var view = this;
	}, 
	// --------- /View Interface Implement --------- //

	// --------- Events --------- //
	events: {
		"click; button": function(evt){
			var view = this;
			playFootball.call(view);
		}
	},
	// --------- /Events --------- //

});

function playFootball(){
	var view = this;
	var footballEl = d.first(view.el, ".football");
	footballEl.classList.add("playing");
}