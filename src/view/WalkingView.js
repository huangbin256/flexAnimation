var d = mvdom; // external lib
var app = require("../js-app/app.js");
var route = require("../js-app/route.js");
var render = require("../js-app/render.js").render;

/**
 * View: RotateView
 */

d.register("WalkingView", {
	
	create: function(data, config) {
		return render("tmpl-WalkingView");
	},

	postDisplay: function(data, config){
		var view = this;
		init.call(view);
	}, 
	// --------- /View Interface Implement --------- //

	// --------- Events --------- //
	events: {
		"click; button": function(evt){
			var view = this;
			play.call(view);
		}
	},
	// --------- /Events --------- //


});

function init(){
	var view = this;
	var canvas = d.first(view.el, "canvas");
	var w = canvas.parentNode.clientWidth;
	var h = canvas.parentNode.clientHeight;
	canvas.width = w;
	canvas.height = h;

	var stage = new createjs.Stage(canvas);
	if (window.devicePixelRatio) {
		// grab the width and height from canvas
		var height = canvas.getAttribute('height');
		var width = canvas.getAttribute('width');
		// reset the canvas width and height with window.devicePixelRatio applied
		canvas.setAttribute('width', Math.round(width * window.devicePixelRatio));
		canvas.setAttribute('height', Math.round( height * window.devicePixelRatio));
		// force the canvas back to the original size using css
		canvas.style.width = width+"px";
		canvas.style.height = height+"px";
		// set CreateJS to render scaled
		stage.scaleX = stage.scaleY = window.devicePixelRatio;
	}

	var data = {
		framerate: 30,
		"images": ["./imgs/walk.jpg"],
		"frames": {"regX": 82, "height": 74, "count": 24, "regY": 0, "width": 56},
		// define two animations, run (loops, 1.5x speed) and jump (returns to run):
		"animations": {
			"run": [0, 7, "run", .5],
			"leftRun": [8, 15, "leftRun", .5],
			"rightRun": [16, 23, "rightRun", .5]
		}
	};

	var spriteSheet = new createjs.SpriteSheet(data);

	var grant = view._grant = new createjs.Sprite(spriteSheet);
	grant.x = w / 2;
	grant.y = 80;
	// Add Grant to the stage, and add it as a listener to Ticker to get updates each frame.
	stage.addChild(grant);

	var grant1 = view._grant1 = new createjs.Sprite(spriteSheet);
	grant1.x = w / 2 - 100;
	grant1.y = 160;
	// Add Grant to the stage, and add it as a listener to Ticker to get updates each frame.
	stage.addChild(grant1);
	view._grant1.gotoAndStop("rightRun");

	var grant2 = view._grant2 = new createjs.Sprite(spriteSheet);
	grant2.x = w / 2 + 100;
	grant2.y = 160;
	// Add Grant to the stage, and add it as a listener to Ticker to get updates each frame.
	stage.addChild(grant2);
	view._grant2.gotoAndStop("leftRun");


	createjs.Ticker.timingMode = createjs.Ticker.RAF;
	createjs.Ticker.addEventListener("tick", stage);
}  



function play(){
	var view = this;
	view._grant.gotoAndPlay("run");
	view._grant1.gotoAndPlay("rightRun");
	view._grant2.gotoAndPlay("leftRun");
}
