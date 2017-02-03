var d = mvdom; // external lib
var app = require("../js-app/app.js");
var route = require("../js-app/route.js");
var render = require("../js-app/render.js").render;

/**
 * View: MainView
 * Description: Show app main view.
 */

d.register("MainView", {
	
	create: function(data, config) {
		// first empty the content
		d.first("body").innerHTML = "";

		return render("tmpl-MainView");
	},

	postDisplay: function(data, config){
		var view = this;
	}, 
	// --------- /View Interface Implement --------- //

	// --------- Events --------- //
	events: {
		"click; .nav li": function(evt){
			var view = this;
			var nav = evt.target.getAttribute("data-nav");
			window.location.hash = nav;
		}
	},
	// --------- /Events --------- //

	// --------- Hub Events --------- //
	hubEvents: {
		// event for url changes
		"routeHub;CHANGE": function(event){
			var view = this;
			showView.call(view);
		}
	}
	// --------- /Hub Events --------- //

});

// hashpath / Template View mapping
var viewNameByPath = {
	"football": "FootballView",
	"createjs-football": "CreateJSFootballView",
	"walking": "WalkingView",
	"clock": "ClockView"
};

function showView(){
	var view = this;
	var path0 = route.pathAt(0);
	var contentViewName = viewNameByPath[path0] || "FootballView";

	var contentEl = d.first(view.el, ".MainView-content");
	d.empty(contentEl);
	d.display(contentViewName, contentEl);
}

