var d = mvdom; // external lib
var app = require("../js-app/app.js");
var route = require("../js-app/route.js");
var render = require("../js-app/render.js").render;

/**
 * View: RotateView
 */

d.register("EggView", {
	
	create: function(data, config) {
		return render("tmpl-EggView");
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

	var stage = view._stage = new createjs.Stage(canvas);
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
	image.src = "./imgs/egg.png";
	var sizeX = 200;
	var sizeY = 150;
	var x = view._x = w / 2 - sizeX / 2;
	var y = view._y = 100;
	var cx = 620;
	image.onload = function(evt){
		var egg = view._egg = new createjs.Container();
		egg.x = 0;
		egg.y = 0;
		var eggBmp = new createjs.Bitmap(event.target);
		eggBmp.x = x;
		eggBmp.y = y;
		eggBmp.scaleX = sizeX / eggBmp.getBounds().width;
		eggBmp.scaleY = sizeY / eggBmp.getBounds().height;

		var g = new createjs.Graphics()
					.moveTo(0,0).lineTo(cx, 0)
					.lineTo(cx - 20, y + 60).lineTo(cx + 30, y + 80).lineTo(cx - 30, y + 160).lineTo(cx + 25, y + 300)
					.lineTo(0, y + 300)
					.closePath();
		var maskShape = new createjs.Shape(g);
		eggBmp.mask = maskShape;
		egg.addChild(eggBmp);
		stage.addChild(egg);

		// for another part
		var egg1 = view._egg1 = new createjs.Container();
		egg1.x = 0;
		egg1.y = 0;
		var egg1Bmp = new createjs.Bitmap(event.target);
		egg1Bmp.x = x;
		egg1Bmp.y = y;
		egg1Bmp.scaleX = sizeX / egg1Bmp.getBounds().width;
		egg1Bmp.scaleY = sizeY / egg1Bmp.getBounds().height;

		var g1 = new createjs.Graphics()
					.moveTo(w,0).lineTo(cx, 0)
					.lineTo(cx - 20, y + 60).lineTo(cx + 30, y + 80).lineTo(cx - 30, y + 160).lineTo(cx + 25, y + 300)
					.lineTo(w, y + 300)
					.closePath();
		var maskShape1 = new createjs.Shape(g1);
		egg1Bmp.mask = maskShape1;
		egg1.addChild(egg1Bmp);
		stage.addChild(egg1);


		var egg0 = view._egg0 = new createjs.Bitmap(event.target);
		egg0.x = x;
		egg0.y = y;
		egg0.scaleX = sizeX / egg0.getBounds().width;
		egg0.scaleY = sizeY / egg0.getBounds().height;
		stage.addChild(egg0);

		stage.update();
		createjs.Ticker.addEventListener("tick", function(event){
			tick.call(view, event);
		});
		createjs.Ticker.paused = true;
	};

}

function tick(event) {
	var view = this;
	if(!createjs.Ticker.paused){
		if(view._stage.contains(view._egg0)){
			view._stage.removeChild(view._egg0)
		}
		view._egg.x -= 5;
		view._egg1.x += 5;
		view._stage.update(event);
		if(view._egg.x <= -60){
			createjs.Ticker.paused = true;
		}
	}
}

function play(){
	var view = this;
	view._stage.addChild(view._egg0)
	view._egg.x = 0;
	view._egg1.x = 0;
	createjs.Ticker.paused = false;
}
