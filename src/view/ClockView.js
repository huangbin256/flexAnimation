var d = mvdom; // external lib
var app = require("../js-app/app.js");
var route = require("../js-app/route.js");
var render = require("../js-app/render.js").render;

var HOUR_HAND = "hour-pointer";
var MINUTE_HAND = "min-pointer";
var SECOND_HAND = "sec-pointer";

/**
 * View: RotateView
 */

d.register("ClockView", {
	
	create: function(data, config) {
		return render("tmpl-ClockView");
	},

	postDisplay: function(data, config){
		var view = this;
		// init time offset;
		view._offset = 0;
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
		view._centerX = startX * 2;
		view._centerY = startY * 2;

		// create hour hand
		var graphics = new createjs.Graphics().beginFill("#000000");
		var hourPointer  = view._hourPointer = new createjs.Shape(graphics);
		hourPointer.setBounds(0,0,6,50);
		hourPointer.graphics.drawRect(0, 0, 6,50);
		hourPointer.x = startX + 1;
		hourPointer.y = startY;
		hourPointer.regX = 3;
		hourPointer.regY = 0;
		stage.addChild(hourPointer);

		// create minute hand
		graphics = new createjs.Graphics().beginFill("#000000");
		var minPointer  = view._minPointer = new createjs.Shape(graphics);
		minPointer.setBounds(0,0,4,60);
		minPointer.graphics.drawRect(0, 0, 4, 60);
		minPointer.x = startX + 1.5;
		minPointer.y = startY;
		minPointer.regX = 2;
		minPointer.regY = 0;
		stage.addChild(minPointer);

		// create second hand
		graphics = new createjs.Graphics().beginFill("#9a0606");
		var secPointer = view._secPointer = new createjs.Shape(graphics);
		secPointer.setBounds(0,0,2,70);
		secPointer.graphics.drawRect(0, 0, 2, 70);
		secPointer.x = startX + 1.5;
		secPointer.y = startY;
		secPointer.regX = 1;
		secPointer.regY = 0;
		stage.addChild(secPointer);

		createjs.Ticker.setFPS(60);
		createjs.Ticker.addEventListener("tick", function(event){
			if(createjs.Ticker.getPaused()){
				return ;
			}
			showTime.call(view);
		});

		// for hour hands drag start event
		hourPointer.on("mousedown",function(evt) {
			dragStart.call(view, evt, HOUR_HAND);
		});

		// for hour hands drag move event
		hourPointer.on("pressmove",function(evt) {
			dragMove.call(view, evt, HOUR_HAND);
		});

		// for hour hands drag event end
		hourPointer.on("pressup",function(evt) {
			dragEnd.call(view, evt, HOUR_HAND);
		});

		// for minute hands drag start event
		minPointer.on("mousedown",function(evt) {
			dragStart.call(view, evt, MINUTE_HAND);
		});

		// for minute hands drag move event
		minPointer.on("pressmove",function(evt) {
			dragMove.call(view, evt, MINUTE_HAND);
		});

		// for minute hands drag event end
		minPointer.on("pressup",function(evt) {
			dragEnd.call(view, evt, MINUTE_HAND);
		});

		// for second hands drag start event
		secPointer.on("mousedown",function(evt) {
			dragStart.call(view, evt, SECOND_HAND);
		});

		// for second hands drag move event
		secPointer.on("pressmove",function(evt) {
			dragMove.call(view, evt, SECOND_HAND);
		});

		// for second hands drag event end
		secPointer.on("pressup",function(evt) {
			dragEnd.call(view, evt, SECOND_HAND);
		});

	};
}  

function dragStart(evt, hand){
	var view = this;
	view._startX = evt.stageX;
	view._startY = evt.stageY;
	if(hand == HOUR_HAND){
		view._startRotation = view._hourPointer.rotation;
	}else if(hand == MINUTE_HAND){
		view._startRotation = view._minPointer.rotation;
	}else{
		view._startRotation = view._secPointer.rotation;
	}
	view._angle = 0;
	view._startOffset = view._offset;
}

function dragMove(evt, hand){
	var view = this;
	createjs.Ticker.setPaused(true);
	var a = Math.sqrt(Math.pow((evt.stageX - view._startX),2) + Math.pow((evt.stageY - view._startY),2));
	var b = Math.sqrt(Math.pow((view._startX - view._centerX),2) + Math.pow((view._startY - view._centerY),2));
	var c = Math.sqrt(Math.pow((evt.stageX - view._centerX),2) + Math.pow((evt.stageY - view._centerY),2));
	var angle = Math.acos((Math.pow(b,2) + Math.pow(c, 2) - Math.pow(a, 2)) / (2 * b * c));
	angle = angle / Math.PI * 180;
	// check if clockwise
	// use: p12 x p23 = (x2-x1)*(y3-y2)-(y2-y1)*(x3-x2)
	var clockwise = (view._startX - view._centerX) * (evt.stageY - view._startY) - (view._startY - view._centerY) * (evt.stageX - view._startX) > 0 ? 1 : -1;
	view._angle += angle * clockwise;
	var baseAngle = 6;
	if(hand == HOUR_HAND){
		baseAngle = 30;
	}
	var pointer = null;
	if(hand == HOUR_HAND){
		pointer = view._hourPointer;
	}else if(hand == MINUTE_HAND){
		pointer = view._minPointer;
	}else{
		pointer = view._secPointer;
	}
	var changedAngle = Math.round(view._angle / baseAngle) * baseAngle;
	pointer.rotation = view._startRotation + changedAngle;
	view._startX = evt.stageX;
	view._startY = evt.stageY;

	if(hand == HOUR_HAND){
		view._offset = view._startOffset + changedAngle / 360 * 12 * 3600 * 1000;
	}else if(hand == MINUTE_HAND){
		view._offset = view._startOffset + changedAngle / 360 * 60 * 60 * 1000;
	}else{
		view._offset = view._startOffset + changedAngle / 360 * 60 * 1000;
	}
	showTime.call(view);
}

function dragEnd(evt, hand){
	var view = this;
	createjs.Ticker.setPaused(false);
}

function showTime(){
	var view = this;
	var stage = view._stage, hourPointer = view._hourPointer, minPointer = view._minPointer, secPointer = view._secPointer;
	var now = new Date(new Date() * 1 + view._offset);
	var secs = now.getSeconds();
	var mins = now.getMinutes();
	var hours = now.getHours() > 12 ? now.getHours() - 12 : now.getHours();
	secPointer.rotation = secs * 6 + 180;
	minPointer.rotation = (mins + secs / 60) * 6 + 180;
	hourPointer.rotation = (hours + mins / 60 + secs / 3600) * 30 + 180;
	stage.update();
}
