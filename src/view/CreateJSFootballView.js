var d = mvdom; // external lib
var app = require("../js-app/app.js");
var route = require("../js-app/route.js");
var render = require("../js-app/render.js").render;

/**
 * View: RotateView
 */

d.register("CreateJSFootballView", {
	
	create: function(data, config) {
		return render("tmpl-CreateJSFootballView");
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
			playBall.call(view);
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

	var image = new Image();
	image.src = "./imgs/football.png";
	var sizeX = 50;
	var sizeY = 50;
	var ball = null;
	image.onload = function(evt){
		ball = new createjs.Bitmap(event.target);
		ball.x = w / 2 - sizeX / 2;
		ball.y = 100;
		ball.scaleX = sizeX / ball.getBounds().width;
		ball.scaleY = sizeY / ball.getBounds().height;
		stage.addChild(ball);


		ball.regX = ball.getBounds().width / 2;
		ball.regY = ball.getBounds().height / 2;
		createjs.Tween.get(ball, { loop: true })
			.to({ y: h-sizeY + 25, rotation: 180}, 1000, createjs.Ease.getPowIn(2))
			.to({ y: h-sizeY + 30, scaleY: ball.scaleY / 1.2}, 50, createjs.Ease.getPowOut(2))
			.to({ y: h-sizeY + 25, scaleY: ball.scaleY}, 50, createjs.Ease.getPowIn(2))
			.to({ y: 100, rotation: 360}, 1000, createjs.Ease.getPowOut(2));


		createjs.Ticker.setFPS(60);
		createjs.Ticker.addEventListener("tick", stage);
		createjs.Ticker.paused = true;

	};

}



function playBall(){
	var view = this;
	createjs.Ticker.paused = false;
}
