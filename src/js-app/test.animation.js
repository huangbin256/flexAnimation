(function (lib, img, cjs, ss, an) {
console.log(cjs);
var p; // shortcut to reference prototypes
lib.webFontTxtInst = {}; 
var loadedTypekitCount = 0;
var loadedGoogleCount = 0;
var gFontsUpdateCacheList = [];
var tFontsUpdateCacheList = [];
lib.ssMetadata = [];



lib.updateListCache = function (cacheList) {		
	for(var i = 0; i < cacheList.length; i++) {		
		if(cacheList[i].cacheCanvas)		
			cacheList[i].updateCache();		
	}		
};		

lib.addElementsToCache = function (textInst, cacheList) {		
	var cur = textInst;		
	while(cur != exportRoot) {		
		if(cacheList.indexOf(cur) != -1)		
			break;		
		cur = cur.parent;		
	}		
	if(cur != exportRoot) {		
		var cur2 = textInst;		
		var index = cacheList.indexOf(cur);		
		while(cur2 != cur) {		
			cacheList.splice(index, 0, cur2);		
			cur2 = cur2.parent;		
			index++;		
		}		
	}		
	else {		
		cur = textInst;		
		while(cur != exportRoot) {		
			cacheList.push(cur);		
			cur = cur.parent;		
		}		
	}		
};		

lib.gfontAvailable = function(family, totalGoogleCount) {		
	lib.properties.webfonts[family] = true;		
	var txtInst = lib.webFontTxtInst && lib.webFontTxtInst[family] || [];		
	for(var f = 0; f < txtInst.length; ++f)		
		lib.addElementsToCache(txtInst[f], gFontsUpdateCacheList);		

	loadedGoogleCount++;		
	if(loadedGoogleCount == totalGoogleCount) {		
		lib.updateListCache(gFontsUpdateCacheList);		
	}		
};		

lib.tfontAvailable = function(family, totalTypekitCount) {		
	lib.properties.webfonts[family] = true;		
	var txtInst = lib.webFontTxtInst && lib.webFontTxtInst[family] || [];		
	for(var f = 0; f < txtInst.length; ++f)		
		lib.addElementsToCache(txtInst[f], tFontsUpdateCacheList);		

	loadedTypekitCount++;		
	if(loadedTypekitCount == totalTypekitCount) {		
		lib.updateListCache(tFontsUpdateCacheList);		
	}		
};
// symbols:
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.Symbol3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#0066CC").s().p("AiUCUQg9g9AAhXQAAhWA9g+QA+g9BWAAQBXAAA9A9QA+A+AABWQAABXg+A9Qg9A+hXAAQhWAAg+g+g");
	this.shape.setTransform(21,21);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol3, new cjs.Rectangle(0,0,42,42), null);


// stage content:
(lib.test = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 4
	this.instance = new lib.Symbol3();
	this.instance.parent = this;
	this.instance.setTransform(99.1,59,1,1,0,0,0,21,42);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regY:21,scaleY:1,x:99,y:43.1},0).wait(1).to({scaleY:0.99,y:48.3},0).wait(1).to({scaleY:0.99,y:53.4},0).wait(1).to({scaleY:0.98,y:58.6},0).wait(1).to({scaleY:0.98,y:63.8},0).wait(1).to({scaleY:0.98,y:68.9},0).wait(1).to({scaleY:0.97,x:98.9,y:74.1},0).wait(1).to({scaleY:0.97,y:79.3},0).wait(1).to({scaleY:0.97,y:84.4},0).wait(1).to({scaleY:0.96,y:89.6},0).wait(1).to({scaleY:0.96,y:94.8},0).wait(1).to({scaleY:0.95,y:99.9},0).wait(1).to({scaleY:0.95,x:98.8,y:105.1},0).wait(1).to({scaleY:0.95,y:110.2},0).wait(1).to({scaleY:0.94,y:115.4},0).wait(1).to({scaleY:0.94,y:120.6},0).wait(1).to({scaleY:0.93,y:125.7},0).wait(1).to({scaleY:0.93,y:130.9},0).wait(1).to({scaleY:0.93,x:98.7,y:136.1},0).wait(1).to({scaleY:0.92,y:141.2},0).wait(1).to({scaleY:0.92,y:146.4},0).wait(1).to({scaleY:0.91,y:151.6},0).wait(1).to({scaleY:0.91,y:156.7},0).wait(1).to({scaleY:0.91,y:161.9},0).wait(1).to({scaleY:0.9,x:98.6,y:167},0).wait(1).to({scaleY:0.9,y:172.2},0).wait(1).to({scaleY:0.9,y:177.4},0).wait(1).to({scaleY:0.89,y:182.5},0).wait(1).to({scaleY:0.89,y:187.7},0).wait(1).to({scaleY:0.88,y:192.9},0).wait(1).to({scaleY:0.88,x:98.5,y:198},0).wait(1).to({scaleY:0.88,y:203.2},0).wait(1).to({scaleY:0.87,y:208.4},0).wait(1).to({scaleY:0.87,y:213.5},0).wait(1).to({scaleY:0.86,y:218.7},0).wait(1).to({scaleY:0.86,y:223.8},0).wait(1).to({scaleY:0.86,x:98.4,y:229},0).wait(1).to({scaleY:0.85,y:234.2},0).wait(1).to({scaleY:0.85,y:239.3},0).wait(1).to({scaleY:0.84,y:244.5},0).wait(1).to({scaleY:0.84,y:249.7},0).wait(1).to({scaleY:0.84,y:254.8},0).wait(1).to({scaleY:0.83,x:98.3,y:260},0).wait(1).to({scaleY:0.83,y:265.2},0).wait(1).to({scaleY:0.82,y:270.3},0).wait(1).to({scaleY:0.82,y:275.5},0).wait(1).to({scaleY:0.82,y:280.7},0).wait(1).to({scaleY:0.81,y:285.8},0).wait(1).to({scaleY:0.81,x:98.2,y:291},0).wait(1).to({scaleY:0.81,y:296.1},0).wait(1).to({scaleY:0.8,y:301.3},0).wait(1).to({scaleY:0.8,y:306.5},0).wait(1).to({scaleY:0.79,y:311.6},0).wait(1).to({scaleY:0.79,y:316.8},0).wait(1).to({scaleY:0.79,x:98.1,y:322},0).wait(1).to({scaleY:0.78,y:327.1},0).wait(1).to({scaleY:0.78,y:332.3},0).wait(1).to({scaleY:0.77,y:337.5},0).wait(1).to({scaleY:0.77,y:342.6},0).wait(1).to({scaleY:0.77,y:347.8},0).wait(1).to({scaleY:0.76,y:353},0).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(353.1,217,42,42);
// library properties:
lib.properties = {
	width: 550,
	height: 400,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	webfonts: {},
	manifest: [],
	preloads: []
};




})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{}, AdobeAn = AdobeAn||{});
var lib, images, createjs, ss, AdobeAn;