var d = mvdom; // external lib
var app = require("../js-app/app.js");
var route = require("../js-app/route.js");
var render = require("../js-app/render.js").render;

/**
 * View: RotateView
 */

d.register("DrawboardView", {
	
	create: function(data, config) {
		return render("tmpl-DrawboardView");
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
	stage.autoClear = false;
	stage.enableDOMEvents(true);
	view._index = 0;
	view._colors = ["#828b20", "#b0ac31", "#cbc53d", "#fad779", "#f9e4ad", "#faf2db", "#563512", "#9b4a0b", "#d36600", "#fe8a00", "#f9a71f"];

	createjs.Touch.enable(stage);
	createjs.Ticker.setFPS(24);

	var drawingCanvas = view._drawingCanvas = new createjs.Shape();

	stage.addEventListener("stagemousedown", function(evt){
		handleMouseDown.call(view, evt)
	});
	stage.addEventListener("stagemouseup", function(evt){
		handleMouseUp.call(view, evt)
	});
	stage.addEventListener("stagemousemove", function(evt){
		handleMouseMove.call(view, evt)
	});

	stage.addChild(drawingCanvas);
	stage.update();
}

function handleMouseDown(event) {
	var view = this;
	if (!event.primary) { return; }
	view._isDrawing = true;
	view._color = view._colors[(view._index++) % view._colors.length];
	view._stroke = Math.random() * 30 + 10 | 0;
	view._oldPt = new createjs.Point(view._stage.mouseX / 2, view._stage.mouseY / 2);
	view._oldMidPt = view._oldPt.clone();
}

function handleMouseMove(event) {
	var view = this;
	if (!event.primary || !view._isDrawing) { return; }
	var midPt = new createjs.Point(view._oldPt.x + view._stage.mouseX / 2 >> 1, view._oldPt.y + view._stage.mouseY / 2 >> 1);

	view._drawingCanvas.graphics.clear().setStrokeStyle(view._stroke, 'round', 'round').beginStroke(view._color).moveTo(midPt.x, midPt.y).curveTo(view._oldPt.x, view._oldPt.y, view._oldMidPt.x, view._oldMidPt.y);

	view._oldPt.x = view._stage.mouseX / 2;
	view._oldPt.y = view._stage.mouseY / 2;

	view._oldMidPt.x = midPt.x;
	view._oldMidPt.y = midPt.y;

	view._stage.update();
}

function handleMouseUp(event) {
	var view = this;
	if (!event.primary) { return; }
	view._isDrawing = false;
}
