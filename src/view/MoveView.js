var d = mvdom; // external lib
var app = require("../js-app/app.js");
var route = require("../js-app/route.js");
var render = require("../js-app/render.js").render;

/**
 * View: MoveView
 */

d.register("MoveView", {
	
	create: function(data, config) {
		return render("tmpl-MoveView");
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
			boxEl.style.transform = "translate(500px, 200px)";
		}
	},
	// --------- /Events --------- //


});