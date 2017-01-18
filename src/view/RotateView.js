var d = mvdom; // external lib
var app = require("../js-app/app.js");
var route = require("../js-app/route.js");
var render = require("../js-app/render.js").render;

/**
 * View: RotateView
 */

d.register("RotateView", {
	
	create: function(data, config) {
		return render("tmpl-RotateView");
	},

	postDisplay: function(data, config){
		var view = this;
	}, 
	// --------- /View Interface Implement --------- //

	// --------- Events --------- //
	events: {
		"click; button": function(evt){
			var view = this;
			var boxEl = d.first(view.el, ".box");
			boxEl.style.transform = "rotate(270deg)";
		}
	},
	// --------- /Events --------- //


});