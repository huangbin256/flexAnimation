var d = mvdom; // external lib
var app = require("../js-app/app.js");
var route = require("../js-app/route.js");
var render = require("../js-app/render.js").render;

/**
 * View: RotateView
 */

d.register("TransformView", {
	
	create: function(data, config) {
		return render("tmpl-TransformView");
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
	image.src = "./imgs/lake.png";
	var sizeX = 500;
	var sizeY = 300;
	image.onload = function(evt){
		var sliceCount = 6;
		var sliceWidth = view._sliceWidth = evt.target.width / sliceCount;
		var sliceContainer = view._sliceContainer = new createjs.Container();
		sliceContainer.x = w / 2;
		for (var i = 0; i < sliceCount; i++) {
			var slice = new createjs.Bitmap(event.target);
			slice.sourceRect = new createjs.Rectangle(sliceWidth * i, 0, sliceWidth, evt.target.height);
			slice.cache(0, 0, sliceWidth, evt.target.height);
			slice.filters = [new createjs.ColorMatrixFilter(new createjs.ColorMatrix())];
			sliceContainer.addChild(slice);
		}

		stage.addChild(sliceContainer);

		stage.update();
		play.call(view, 0);
	};

}

function play(value){
	var view = this;
	var sliceContainer = view._sliceContainer;
	var sliceWidth = view._sliceWidth
	var degToRad = Math.PI / 180;
	var value = typeof value == "undefined" ? 10 : value;

	var l = sliceContainer.getNumChildren();
	for (var i = 0; i < l; i++) {
		var slice = sliceContainer.getChildAt(i);
		slice.y = Math.sin(value * degToRad) * -sliceWidth / 2;
		if (i % 2) {
			slice.skewY = value;
		} else {
			slice.skewY = -value;
			slice.y -= sliceWidth * Math.sin(slice.skewY * degToRad);
		}
		slice.x = sliceWidth * (i - l / 2) * Math.cos(slice.skewY * degToRad);
		slice.filters[0].matrix.setColor(Math.sin(slice.skewY * degToRad) * -80);
		slice.updateCache();
	}
	view._stage.update();
}

