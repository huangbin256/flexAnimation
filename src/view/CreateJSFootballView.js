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
			createjs.Ticker.paused = false;
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

	var image = new Image();
	image.src = "./imgs/football.png";
	var sizeX = 80;
	var sizeY = 80;
	var ball = null;
	image.onload = function(evt){
		ball = new createjs.Bitmap(event.target);
		ball.x = w / 2 - sizeX / 2;
		ball.y = 100;
		ball.scaleX = sizeX / ball.getBounds().width;
		ball.scaleY = sizeY / ball.getBounds().height;
		stage.addChild(ball);


		createjs.Tween.get(ball, { loop: true })
			.to({ y: h-sizeY }, 1000, createjs.Ease.getPowIn(2))
			.to({ y: h-sizeY + 40, scaleY: ball.scaleY / 2 }, 500, createjs.Ease.getPowOut(2))
			.to({ y: h-sizeY, scaleY: ball.scaleY}, 500, createjs.Ease.getPowIn(2))
			.to({ y: 100}, 800, createjs.Ease.getPowIn(2));

		createjs.Ticker.setFPS(60);
		createjs.Ticker.addEventListener("tick", stage);
		createjs.Ticker.paused = true;
	};

}



function playBall(){
	var view = this;
}

function handleImageLoad(event) {
}
