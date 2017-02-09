var d = mvdom; // external lib
var app = require("../js-app/app.js");
var route = require("../js-app/route.js");
var render = require("../js-app/render.js").render;

/**
 * View: RotateView
 */

d.register("OlympicsView", {
	
	create: function(data, config) {
		return render("tmpl-OlympicsView");
	},

	postDisplay: function(data, config){
		var view = this;
		init.call(view);
	}, 
	// --------- /View Interface Implement --------- //

	// --------- Events --------- //
	// --------- /Events --------- //


});


var cj = createjs,
	particles = [],
	centerX,
	centerY,
	particleNum = window.innerWidth / 6,
	color = ["blue","black","red","yellow","green"];
	speed = Math.PI / 60,
	RADIUS = window.innerWidth / 15,
	margin = RADIUS / 10;
	SPEED_MIN = RADIUS / 2,
	SPEED_MAX = RADIUS;


function init(){
	var view = this;

	var canvas = d.first(view.el, "canvas");
	var w = canvas.parentNode.clientWidth;
	var h = canvas.parentNode.clientHeight;
	canvas.width = view._w = w;
	canvas.height = view._h = h;

	var stage = view._stage = new createjs.Stage(canvas);
	var radius = RADIUS;

	for(var i = 1;i <= 3;i++){
		var circle = createCircle.call(view,i,1,radius,color[i - 1]);
	}
	
	var circle = createCircle.call(view,1,2,radius,color[3]); 
	
	circle = createCircle.call(view,2,2,radius,color[4]);

	stage.update();
	createjs.Ticker.timingMode = cj.Ticker.RAF;
	createjs.Ticker.addEventListener("tick",function(){
		tick.call(view);
	});
}

function tick(){
	var view = this;
	for(var i = 0;i < particles.length;i++){
		var particle = particles[i];
		moveParticle.call(view, particle);
	}

	view._stage.update();
}

function createCircle(cx,cy,r,_color){
	var view = this;
	var circle = {};
	if(cy == 1){
		circle.centerX = r + 2 * r * (cx - 1) + ((view._w / 2) - 3 * r);
		circle.centerY = r * cy + ((view._h / 2) - 1.5 * r);
	}else{
		circle.centerX = r + 2 * r * (cx - 1) + r + ((view._w / 2) - 3 * r);
		circle.centerY = r * cy + ((view._h / 2) - 1.5 * r);
	}
	
	circle.radius = r;
	circle.color = _color;

	var rotateCenterX = circle.centerX + circle.radius, rotateCenterY = circle.centerY;
	
	for(var j = 1;j < particleNum;j++){
		var angle = j * 15 * 10;
		var particle = createParticle.call(view, circle.centerX,circle.centerY,angle,circle.radius,circle.color);
		particles.push(particle);
		view._stage.addChild(particle.shape);
	}
	return circle;
}

function createParticle(cx,cy,angle,radius,color){
	var view = this;
	var particle = {};
	var shape = new createjs.Shape();
	particle.shape = shape;
	particle.radius = getRandomNum.call(view, 5,10);
	
	getColor.call(view, shape,color);
			
	particle.shape.graphics.drawCircle(0,0,getRandomNum.call(view, 1,10)).endFill();
	particle.centerX = cx;
	particle.centerY = cy;
	particle.angle = angle;
	if(getRandomNum.call(view, 1,10) % 2 == 0){
		particle.speed =  Math.PI / (getRandomNum.call(view, SPEED_MIN,SPEED_MAX));
	}else{
		particle.speed =  - Math.PI / (getRandomNum.call(view, SPEED_MIN,SPEED_MAX));
	}
	
	particle.rotateCenterX = cx + radius;
	particle.rotateCenterY = cy;
	
	particle.shape.compositeOperation = "darker";
	return particle;
}


function moveParticle(particle){
	var view = this;
	particle.angle += particle.speed;
	
	particle.rotateCenterX = particle.centerX + (RADIUS - margin) * Math.cos(particle.angle / 5);
	particle.rotateCenterY = particle.centerY + (RADIUS - margin) * Math.sin(particle.angle / 5);
	
	particle.shape.x = particle.rotateCenterX + particle.radius * Math.cos(particle.angle / 360) * Math.cos(particle.angle);
	particle.shape.y = particle.rotateCenterY + particle.radius * Math.sin(particle.angle / 360) * Math.sin(particle.angle);
};


function getRandomNum( min, max ) {
	return ( Math.random() * ( max - min ) + min ) | 0;
}

function getColor(obj, color){
	var fillColor;
	switch(color){
		case "blue":
			switch((Math.random() * 5 | 0 ) % 5){
				case 0:
					fillColor = obj.graphics.beginFill("#0B5FA5");
					break;
				case 1:
					fillColor = obj.graphics.beginFill("#25547B");
					break;
				case 2:
					fillColor = obj.graphics.beginFill("#043C6B");
					break;
				case 3:
					fillColor = obj.graphics.beginFill("#3F8FD2");
					break;
				case 4:
					fillColor = obj.graphics.beginFill("#66A1D2");
					break;
				default:
					break;
			}
			break;
		case "black":
			switch((Math.random() * 5 | 0 ) % 5){
				case 0:
					fillColor = obj.graphics.beginFill("#000");
					break;
				case 1:
					fillColor = obj.graphics.beginFill("#111");
					break;
				case 2:
					fillColor = obj.graphics.beginFill("#191919");
					break;
				case 3:
					fillColor = obj.graphics.beginFill("#2a2a2a");
					break;
				case 4:
					fillColor = obj.graphics.beginFill("#3b3b3b");
					break;
				default:
					break;
			}
			break;
		case "red":
			switch((Math.random() * 5 | 0 ) % 5){
				case 0:
					fillColor = obj.graphics.beginFill("#FF0000");
					break;
				case 1:
					fillColor = obj.graphics.beginFill("#BF3030");
					break;
				case 2:
					fillColor = obj.graphics.beginFill("#A60000");
					break;
				case 3:
					fillColor = obj.graphics.beginFill("#FF4040");
					break;
				case 4:
					fillColor = obj.graphics.beginFill("FF7373");
					break;
				default:
					break;
			}
			break; 
		case "yellow":
			switch((Math.random() * 5 | 0 ) % 5){
				case 0:
					fillColor = obj.graphics.beginFill("#FFF500");
					break;
				case 1:
					fillColor = obj.graphics.beginFill("#BFBA30");
					break;
				case 2:
					fillColor = obj.graphics.beginFill("#A69F00");
					break;
				case 3:
					fillColor = obj.graphics.beginFill("#FFF840");
					break;
				case 4:
					fillColor = obj.graphics.beginFill("#FFFA73");
					break;
				default:
					break;
			}
			break; 
		case "green":
			switch((Math.random() * 5 | 0 ) % 5){
				case 0:
					fillColor = obj.graphics.beginFill("#25D500");
					break;
				case 1:
					fillColor = obj.graphics.beginFill("#3DA028");
					break;
				case 2:
					fillColor = obj.graphics.beginFill("#188A00");
					break;
				case 3:
					fillColor = obj.graphics.beginFill("#59EA3A");
					break;
				case 4:
					fillColor = obj.graphics.beginFill("#80EA69");
					break;
				default:
					break;
			}
			break; 
		default:
			break;              
	}
	
	return fillColor;
}
