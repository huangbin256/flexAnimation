var d = mvdom; // external lib
var app = require("../js-app/app.js");
var route = require("../js-app/route.js");
var render = require("../js-app/render.js").render;

/**
 * View: RotateView
 */

d.register("ClockView", {
	
	create: function(data, config) {
		return render("tmpl-ClockView");
	},

	postDisplay: function(data, config){
		var view = this;
		init.call(view);
	}, 
	// --------- /View Interface Implement --------- //

	// --------- Events --------- //
	events: {
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
	image.src = "./imgs/clock.png";
	var sizeX = 240;
	var sizeY = 240;
	var clock = null;
	image.onload = function(evt){
		clock = new createjs.Bitmap(event.target);
		clock.x = w / 2 - sizeX / 2;
		clock.y = 100;
		clock.scaleX = sizeX / clock.getBounds().width;
		clock.scaleY = sizeY / clock.getBounds().height;
		stage.addChild(clock);

		var startX = clock.x + sizeX / 2;
		var startY = clock.y + sizeY / 2;

		var graphics = new createjs.Graphics().beginFill("#000000");
		var hourPointer = new createjs.Shape(graphics);
		hourPointer.setBounds(0,0,6,50);
		hourPointer.graphics.drawRect(0, 0, 6,50);
		hourPointer.x = startX - 2;
		hourPointer.y = startY;
		stage.addChild(hourPointer);

		graphics = new createjs.Graphics().beginFill("#000000");
		var minPointer = new createjs.Shape(graphics);
		minPointer.setBounds(0,0,4,60);
		minPointer.graphics.drawRect(0, 0, 4, 60);
		minPointer.x = startX - 1;
		minPointer.y = startY;
		stage.addChild(minPointer);

		graphics = new createjs.Graphics().beginFill("#9a0606");
		var secPointer = new createjs.Shape(graphics);
		secPointer.setBounds(0,0,2,70);
		secPointer.graphics.drawRect(0, 0, 2, 70);
		secPointer.x = startX;
		secPointer.y = startY;
		stage.addChild(secPointer);

		createjs.Ticker.setFPS(60);
		createjs.Ticker.addEventListener("tick", function(event){
			var now = new Date();
			var secs = now.getSeconds();
			var mins = now.getMinutes();
			console.log(mins);
			var hours = now.getHours() > 12 ? now.getHours() - 12 : now.getHours();
			secPointer.rotation = secs * 6 + 180;
			minPointer.rotation = mins * 6 + 180;
			hourPointer.rotation = hours * 30 + 180;
			stage.update();
		});
		createjs.Ticker.paused = false;

	};
}  

