(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"ciclo andar  nuevo pircin 5_01_23_atlas_1", frames: [[370,1379,181,61],[370,1442,181,61],[0,0,672,203],[0,1368,183,401],[562,1323,186,400],[185,1376,183,401],[750,1323,186,400],[205,205,197,585],[1739,0,203,577],[0,784,186,582],[1739,579,192,582],[1112,0,211,584],[674,0,217,570],[1554,594,182,579],[1360,594,192,582],[404,205,197,585],[0,205,203,577],[188,792,186,582],[603,739,192,582],[1325,0,211,584],[893,0,217,570],[1738,1163,182,579],[797,739,192,582],[1184,1257,226,61],[938,1473,323,179],[1263,1473,191,61],[1263,1536,281,34],[1570,1175,151,61],[1184,1178,384,77],[1538,0,199,592],[376,792,184,585],[991,739,191,579],[1184,739,148,401],[603,586,755,151],[1412,1257,234,57],[991,1320,644,151]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if((deltaFrame >= 0) && this.ignorePause){
					cjs.MovieClip.prototype.play.call(this);
					this.ignorePause = false;
				}
				else if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
				else if(deltaFrame <= -2){
					cjs.MovieClip.prototype.stop.call(this);
					this.ignorePause = true;
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CachedBmp_36 = function() {
	this.initialize(ss["ciclo andar  nuevo pircin 5_01_23_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_35 = function() {
	this.initialize(ss["ciclo andar  nuevo pircin 5_01_23_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_34 = function() {
	this.initialize(ss["ciclo andar  nuevo pircin 5_01_23_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_33 = function() {
	this.initialize(ss["ciclo andar  nuevo pircin 5_01_23_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_32 = function() {
	this.initialize(ss["ciclo andar  nuevo pircin 5_01_23_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_31 = function() {
	this.initialize(ss["ciclo andar  nuevo pircin 5_01_23_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_30 = function() {
	this.initialize(ss["ciclo andar  nuevo pircin 5_01_23_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_29 = function() {
	this.initialize(ss["ciclo andar  nuevo pircin 5_01_23_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_28 = function() {
	this.initialize(ss["ciclo andar  nuevo pircin 5_01_23_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_27 = function() {
	this.initialize(ss["ciclo andar  nuevo pircin 5_01_23_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_26 = function() {
	this.initialize(ss["ciclo andar  nuevo pircin 5_01_23_atlas_1"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_25 = function() {
	this.initialize(ss["ciclo andar  nuevo pircin 5_01_23_atlas_1"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_24 = function() {
	this.initialize(ss["ciclo andar  nuevo pircin 5_01_23_atlas_1"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_23 = function() {
	this.initialize(ss["ciclo andar  nuevo pircin 5_01_23_atlas_1"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_22 = function() {
	this.initialize(ss["ciclo andar  nuevo pircin 5_01_23_atlas_1"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_21 = function() {
	this.initialize(ss["ciclo andar  nuevo pircin 5_01_23_atlas_1"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_20 = function() {
	this.initialize(ss["ciclo andar  nuevo pircin 5_01_23_atlas_1"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_19 = function() {
	this.initialize(ss["ciclo andar  nuevo pircin 5_01_23_atlas_1"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_18 = function() {
	this.initialize(ss["ciclo andar  nuevo pircin 5_01_23_atlas_1"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_17 = function() {
	this.initialize(ss["ciclo andar  nuevo pircin 5_01_23_atlas_1"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_16 = function() {
	this.initialize(ss["ciclo andar  nuevo pircin 5_01_23_atlas_1"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_15 = function() {
	this.initialize(ss["ciclo andar  nuevo pircin 5_01_23_atlas_1"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_14 = function() {
	this.initialize(ss["ciclo andar  nuevo pircin 5_01_23_atlas_1"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_13 = function() {
	this.initialize(ss["ciclo andar  nuevo pircin 5_01_23_atlas_1"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_12 = function() {
	this.initialize(ss["ciclo andar  nuevo pircin 5_01_23_atlas_1"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_11 = function() {
	this.initialize(ss["ciclo andar  nuevo pircin 5_01_23_atlas_1"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_10 = function() {
	this.initialize(ss["ciclo andar  nuevo pircin 5_01_23_atlas_1"]);
	this.gotoAndStop(26);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_9 = function() {
	this.initialize(ss["ciclo andar  nuevo pircin 5_01_23_atlas_1"]);
	this.gotoAndStop(27);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_8 = function() {
	this.initialize(ss["ciclo andar  nuevo pircin 5_01_23_atlas_1"]);
	this.gotoAndStop(28);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_7 = function() {
	this.initialize(ss["ciclo andar  nuevo pircin 5_01_23_atlas_1"]);
	this.gotoAndStop(29);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_6 = function() {
	this.initialize(ss["ciclo andar  nuevo pircin 5_01_23_atlas_1"]);
	this.gotoAndStop(30);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_5 = function() {
	this.initialize(ss["ciclo andar  nuevo pircin 5_01_23_atlas_1"]);
	this.gotoAndStop(31);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_4 = function() {
	this.initialize(ss["ciclo andar  nuevo pircin 5_01_23_atlas_1"]);
	this.gotoAndStop(32);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_3 = function() {
	this.initialize(ss["ciclo andar  nuevo pircin 5_01_23_atlas_1"]);
	this.gotoAndStop(33);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2 = function() {
	this.initialize(ss["ciclo andar  nuevo pircin 5_01_23_atlas_1"]);
	this.gotoAndStop(34);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1 = function() {
	this.initialize(ss["ciclo andar  nuevo pircin 5_01_23_atlas_1"]);
	this.gotoAndStop(35);
}).prototype = p = new cjs.Sprite();



(lib.Símbolo2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#0000CC").s().p("AveFHQh/gsgmgdQhdhJgKh7QgKh5BOhcQAjgxA6gjQBAgYBcAAQBdAAAnAiQAeAUAPAiQAOAigUAeQgdAwhxAAQhwgKgYA7QgPAhAUAnQATAjAiAOQAxAZBnAPQBiAdAABJQAEAigcAiQgeAZgsAKIgPAAQgzAAhWgZgANBD0QgGgJAAgGQgOAKgKAAIgxgTQgKgPgEgEIAAgLQgegTAFgiQgFgiAPgZQAig1BYgLICOgFQAigJAFgOQAOgTgdgoQgmgxgjgJQgYgFgsAOQgyAQgYgFQgnAAgdgoQgZgnAKgnQAPgxA7giQBOgsBcAFQBTAKBAAsQAKAEAFAGQCcBsgTDMQgKA+gYAoQgoA/hOAeIgsAJIi+APIgnAAg");
	this.shape.setTransform(126.0065,35.2297);

	this.instance = new lib.CachedBmp_36();
	this.instance.setTransform(251.8,-65.2,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_35();
	this.instance_1.setTransform(-120.6,-47.7,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_34();
	this.instance_2.setTransform(-55.9,-31.15,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]},1).to({state:[{t:this.shape}]},2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-120.6,-65.2,462.9,135.7);


(lib.siguientebt = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#0000CC").s().p("ABFFLQgigLgSgbQgSgcABgjQACgkAXgYQAPgPAogWQAlgVAigZQhnAAgjgBQgegBibgMQhygIhJADQguABgPgBQgigCgYgNQgWgMgOgWQgPgVgBgZQgCgZAMgYQALgXAWgOQATgMAbgFQASgDAhAAQBdgCB1AGQBGADCLAKQghgTgRgNQgbgUgMgYQgJgUgBgXQAAgWAJgVQAJgUARgOQARgPAVgGQAhgJApAOQAeALAnAZIBrBIQA/ApAxAUIA0ATQAdAMATAOQAWARAOAYQAJAOAEAPQAMASAEAXQAEAWgHAWQgQAxhKApQgWAMgKAHQgTANgkAhQgiAggWANQgKAGgWAKIggARIguAgQgcAUgWAGQgPAFgPAAQgRAAgSgGg");
	this.shape.setTransform(53.1141,33.712);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,106.3,67.5);


(lib.pircing_oreja_izq = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#00FFFF").s().p("ACCCqQgPgBgKgKQgOgOACgUQABgQAMgLQALgMAQAAQABAAAAAAQABAAAAgBQABAAAAAAQAAAAAAgBQAOABAMAJQAMAJADAOQAEAOgGANQgGAOgMAHQgJAGgLAAIgHgBgAgDB7QgQgEgJgMQgJgNABgQQAAgQAKgMQAHgIALgDIAQgEQAQAAAMAKQANALADAPQADAPgIAOQgHAPgOAGQgJAEgIAAQgGAAgGgCgAhjApQgVgFgLgRQgLgRAEgTQADgOAJgKQAIgJAMgFQALgFANACQAbADAMAXQAKARgGAUQgGAVgRAKQgLAGgNAAQgGAAgHgBgAiIhUQgPgBgLgIQgKgIgEgOQgEgOAFgNQAFgMALgIQAMgIANAAQAOAAALAJQAMAJAEANQADANgEAOQgFANgMAIQgKAHgNAAIgCAAg");
	this.shape.setTransform(17.8739,17.0708);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,35.8,34.2);


(lib.pircing_oreja_dere = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#00FFFF").s().p("AgHC0QgSAAgLgDQgigKgRgeIgNgaIgKgQIgJgPQgKgUgBgeIABgzQgBgiABgQQACgdAKgTQAFgJANgRQAPgUAEgEQAJgGATgDQAWgDANADQAQADATARQAUAQAEAPQADANgKAOQgIAMgOAEQgNADgOgGQgNgHgJgMQgCAHgJAKQgJALgDAGQgCAGgBAJIAAAQQABAQgBAgQACAdAJASIAIALQAFAHACAFIADALQACAGADAEQAIAKAUgCIARgCQAJgBAGABQADgHAIgJIAMgRQAKgPgCggQgBgPABgJQALgBAOgGQAOgIAPgPIADgDIAEAGQADAIACATIACAtQAAAYgEAPQgFAXgWAgQgWAfgSAHQgIADgLAAIgSAAIgSABIgMgBg");
	this.shape.setTransform(13.1,18.0625);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,26.2,36.1);


(lib.pircing_nariz = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#00FFFF").s().p("AgTBHQgOgBgHgEQgKgJgGgDIgQgGQgMgFgEgQQgEgMAAgZQAAgLACgFQACgHAIgJIARgUQAGgHAFgBQAEgCAFADQAEACACAFQAEAIgGAKQgEAGgKAGQABAFgCAOQgBAMADAFQAEAJAVADQAVACAGgBQARgBAJgJQAMgJAAgRQgBgJgFgHIgHgKQgDgHADgHQACgIAHgCQAIgDAPAHQALAFAEAGIADAJIAHANQAEAIAEARQADAKAAAGQgBAMgMARQgJAMgHAFQgJAHgPAEQgWAGgVAAIgQgBg");
	this.shape.setTransform(9.3036,7.186);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,18.6,14.4);


(lib.pircing_ceja = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#00FFFF").s().p("AgZBuQgPgGgUgVQgNgNgIgMQgHgJgCgIQgCgIAAgMQAAgeAGgYIAFgTQAIgWAQgQQARgQAVgGQAUgHASAIQAKAEAGAJQAGAIABAKQAAALgGAIQgHAJgKABIgQgBQgKACgLAKQgSARgBAVQgBAJADALQAEALAKAMQAGAIAHADQAHADAPAAQANAAAFgCIAKgGIAKgGQAOgGAOAIQAOAJgBAQQgCAOgNAMQgYAVgpABIgFAAQgTAAgOgGg");
	this.shape.setTransform(9.3033,11.6106);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,18.6,23.2);


(lib.pircing_boca = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#00FFFF").s().p("AgDBYQgggDgMgHIgQgNQgOgOgDgMQAAgHACgFQAFgLALADQAFAAAFAEIAJAJQAJAJAMAFQAIACAGgBQAKgBAIgLIALgWIAFgKIABgMIgBgOQgDgMgRgPQgIgIgGgBIgNABQgOAAgEgJIACgIQACgCAFgCQAggOAiAJIALADQAFACAEAEQAKAKAJAWQADAGACAHQACAJgBAMQgCAZgFASIgFANQgCAHgEAFQgFAJgKAGQgLAJgLADQgGACgNAAIgKAAg");
	this.shape.setTransform(8.0867,8.8501);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,16.2,17.7);


(lib.muñecodelado = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#0000CC").s().p("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MABgFQADgJAHgFQAEgCAHgBQABgDADgEQAWgmAPgjQACgGADgCQAFgEAEAEQADADgDAIQgUAsgUAjIACABQAFACAHAJIAFAKQABADAAALIAAAPQgCALgRAIIAAABQABAZgCAMIgCAMIgBAqIAAAJIAhABQAKABADAEQAEAEAAAKQAAAoAHAUQADALgBAEQAAACgIAJQgDAEgEAJIgIANIgHAJQgFAFgBAFIgCAKQgCAHgFABIgCAAIgHgCgAmzjuQgCABgDADQgNAOgJAQIgFAJQgKASgKANQAAAAgBABQAAAAAAABQAAAAAAABQAAAAAAABIADADQAMAGAHAGIAZASQARALAVAGIAdgzIACgFQAAgCgCgGQgGgSAAgsIgugBIgIgBIgBAAgAmnmXIAAAEIABAHIAEAEIACADIACABIADACIADACQABgBAAgEQABgGgDgIIgCgEQgDgCgFAAIgBAAgABSjMQgGgBgJgGQgmgZgUgQQgFgFgCgEIAAgKQAGgTAKgPIgCgBIgMgCIhhgKIgTgBIgLgCIgCAGQgDAFgIADQgRAIgOgFQgLgEgKgOQgHgKABgJQAAgGAEgEQADgDADgBIgghAIgMgVIgRgaIgCAAQgUAIgWgBQgXAAgOgKQgKgGgJgPQgKgQgCgRQgCgRAIgNIACgDIADgFIABgGQACgHAHgJIALgPQAOgMAggEQAdgFAQAGQAJAEAJAIQAQAOAHASQADAIABAIQABANgDANQgFAWgQAQIgJAJIADAFIAQAWQAGAIAKATIAeA6IAEAIIADAAQAGAAAFADIAEADQAFAFACAIIACADIACgBQAZgBAjADIA7AHQAUACAMADQAAgGACgDQAEgLAIADIAIAFQADACAFAAIAIAAIANACQAJACAEgBIALgCQAFAAAGAFQANAKANAUQAGAIABAFQADAKgJAQQgIASgMASIgJAKQgFAFgLADQgHACgFAAIgCAAgABPlBQgIABgXAAIgCAFQABADgBADQgCAFgDACIgBAAQgDAGgCABIgFADQgBACgBAFIgDAHQgBABAAAAQAAABAAAAQgBAAAAABQAAAAAAABQAAAAAAABQABAAAAABQAAAAAAAAQABABAAAAQAMALASAMIAZATQAFADACABIAIAAIAIgDIAFgGIANgTQAIgMADgJQACgDAAgFQgBgDgEgFIgVgcIgGgEQgCgCgFAAIgQADgAiblEIAJABQAEAAACgCQADgDgDgGIgBgEQgCgGgDgCIgFAAIgBAEQgDAFgGACQgEABgDgBQAGAJAHACgAkmpOQgLAEgDACQgFACgJAKIgMAPIABAEIAAABQABAFgBALQgCATASAUIAHAHQAEACAGABQALADAJAAQAQAAAPgIQAVgKAJgVQAGgPgDgPQgCgHgDgHIgHgJQgGgHgEgDQgLgIgQAAQgKAAgTAEgAkVjpQgSgDgIgHQgHgGgHgTIgQg1IgKgkIgJggIgIgpQgHgYAIgIQADgEAEABQADAAAEAEQAHAHAEAVQAGAeANAuQALAlAQAwQABAEADAEQADADAIACQBeASBagIQAXgCAGgKQABgDABgLIABgVQAAgIACgDQAEgGAGABQAEACABAJQACAKgBAPQgBAPgFAJQgLAUgnAFQgdAEghAAQg1AAhDgKgAgzlZIgCgKIAAgCIgEgRQgBgDAAgOIAGiIIAAgaQAAgfgEgSQgKgrgcgVQgIgFgCgEQgCgDAAgDQAAgEADgCQAFgDAHADQAYAIAPAWQAHAKAHAQQAIAVACALQABALAAAVIAAAOIgCBmIAAAGIACAnQABARgDALIgEAVIgBADIgCAJQgCAGgGAAQgEAAgDgGgAlkpIQgIgCAAgJQAAgFAEgJQAMgWAlgcIAQgMQALgGANgGIAngPIAQgEIACAAIAAAAIAEgPQABgHgBgDIgCgLQgBgGABgEQACgEAFgCQAGgCAEADQAEADADAHQABgFAHABIAJAGQAQAOAQAEQAJACATgBQAVgCAJgIQAHgHACgMQANgxgcg6QgEgJAAgFQAAgEADgDQACgEAEAAQADAAAFAEQAFAFAEAIQAbAxgHA3QgDAkgUAQQgPALgaACQgSACgOgDQgSgEgLgLIgPgVIgBgBQAFASgIASQgEAHgEADQgHAEgFgDIgHAEIg2AbQgUALgYAVIgMALQgHAHgDAIIgIALQgEAFgFAAIgDgBgAiXqJQgWgDgNgUQgEgJAFgDQAEgDAHAGQAMAKAHACQAMAEAKgFQAHgDABgDIAEgJQAFgEAFAGQADADgCAHQgCAHgGAGQgMALgRAAIgEAAgAjXryIgFAAQgHACgFgCIgMgCQgPgFgFgKQgEgHABgLQACgUAMgJQgEABgFgDQgDgBgCgEIgMgPIgLgTIgEgKIgCgIQAAgLACgKQACgKAEgFQADgDAFgBQAEgBAEACQAFADABAIIgBANIAAAHIABAGIACAHQAIAPAHAJQAFAHABADQAFAJgHAHIgBABQAFgDAGABQAKAAAGAHQAEAEAAAGQgBAIgIADQgIADAAACQAIACAFADIAEAEQAFAAADABQAEADABAEQACAEgCAEQgBAFgGADIAAABIgDAHIgBACQgCgEAAgDgAh/sqQgGgCgBgIQAAgGAGgEIAEgBIABAAQAIAAACAHQADAHgFAFQgEADgEAAIgEgBgAictjQgJgBgFgDIgGgDIgHgBQgEAAgCgCQgCgCABgEQABgGAHgDQAFgCAHACIAMAFQAIADARgDQALgCAFgDQAEgDADgGQADgFAAgFQgBgHgFgGQgIgIgQgLQgIgGgGgCIgPgFQgJgEABgIQACgHALgCQAPgCATAJQARAHAKAJQAHAGAJANIAEAKIABALQgBAKgDAGIgDAEIADABIgJAIQgEAEgKAGIAAgBQgRAKgVAAIgMgBgAj4t/IgIgHQgIgGgCgFQgCgDAAgEQABgEACgCQAEgDAHACIAJAFIAKAGQADADADAFQADAFgBAFQAAADgDACQgDADgDAAQgFAAgHgFgAjVuNIgHgFQgEgEgIgDIgMgGQgGgDgBgEQgBgHAKgDQAEgBAJABQAJABAGAEQAHADADADQAEAGAAAGQAAAFgDAFQgDADgEAAIgDgBgAiuugIgFgGQgDgFgIgGQgGgEgLgDQgIgCAAgEQABgEAHgBQAHgCAGABQAJABALAIQAHAEAEAGQAFAIgEAHQgBADgDABIgCAAQgCAAgEgCg");
	this.shape.setTransform(51.5743,97.8631);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#0000CC").s().p("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BgNQACgNAHgFQAFgEAFAAIAEABIgBgFIgDgSIgEgkIgBgbIgDgWIgFgYIgBgKIgEAAQgVAAgOgKQgKgGgJgPQgLgQgCgRQgBgSAHgMIACgDIADgFIACgGQABgHAHgJIAMgPQAOgMAfgEQAdgFAQAGQAJAEAJAIQAQAOAGASQADAIABAIQACANgEANQgFAWgPAQIgKAJIABABIgLAHIgMAIIgBgCIgDAAIgQAFIAEAXIADAUIABAXQgBAOABAGIACAPIACAVIACAUIACAKIgBAEIAMAMIADABQAEAGgBAGQABAGgFAIIgBADIADABIALALQBDAIBCgGQALgBAHgCQAAgBAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBIAFgFQADgEACgIIAEgSIAAgBQADgUABgKIgCgaIgBgbIgCAAIgBgPIAHiIIAAgaQgBgfgEgSQgJgrgcgVQgIgFgCgEQgCgDAAgDQAAgEACgCQAFgDAIADQAYAIAPAWQAHAKAGAQQAIAVACALQACALAAAVIAAAOIgCBmIgBAGIACAnQABARgCALIAAABIgCAAIACARQACAbgBAQQgBAYgHASIgFANIgFAKQgLAUgnAFQgQACgSABQgDgCgFAAIgLAAIgKgBIgHAEIgIACIACgCIgagBIAFAGIAlAvIAUAaIAIgFQAKgEAEAHIACAJQABAEAEADIAGAGIAHALQAFAHAEACIAJAHQADADABAIQABAMgCAQIgBALIAAABIgDAEIgCACIgEAOQgGAFgNAEQgSAFgVAEIgKABgACPhlIgHADIgEACQAAAAAAABQgBAAAAAAQAAABAAABQAAAAAAABQABAQAEAUIAEAgIACAIIAGAFIAHAEIAIgBIAXgEQAOgCAJgFQADgBADgDQACgDABgGIAEgjIAAgHQgBgDgDgDIgNgKQgHgEgQgRIgFACIgFAFQgEACgEgBIgBAAQgGABgCgBIgGAAIgGACgAAokCIAGAHQADADADAAQAEAAACgGIACgEQADgGgBgDIgDgEQgBABAAAAQAAAAgBAAQAAABgBAAQAAAAgBAAQgFACgGgDQgDgCgCgDQgCALADAGgAANo+QgMAEgCACQgFACgIAKIgMAPIABAEIAAABQABAFgCALQgBATARAUIAHAHQADACAHABQALADAIAAQARAAAPgIQAVgKAIgVQAGgPgDgPQgBgHgEgHIgGgJQgGgHgEgDQgMgIgQAAQgJAAgTAEgAHBkUIAAgDIgCgFIABABQAGAIABAFIABAGIgHgMgAgxo4QgHgCAAgJQgBgFAFgJQAMgWAlgcIAPgMQAKgGANgGIAogPIAPgEIACAAIAAAAIAFgPQABgHgBgDIgDgLQgBgGACgEQACgEAFgCQAFgCAEADQAFADADAHQABgFAGABIAJAGQARAOAQAEQAJACASgBQAWgCAIgIQAHgHADgMQANgxgcg6QgEgJAAgFQAAgEACgDQADgEADAAQAEAAAEAEQAFAFAEAIQAcAxgHA3QgEAkgUAQQgOALgaACQgTACgOgDQgSgEgKgLIgPgVIgBgBQAEASgIASQgDAHgFADQgGAEgGgDIgGAEIg3AbQgTALgYAVIgMALQgGAHgEAIIgHALQgFAFgFAAIgDgBgACcp5QgXgDgMgUQgFgJAFgDQAEgDAHAGQAMAKAHACQAMAEALgFQAGgDACgDIADgJQAFgEAFAGQAEADgCAHQgCAHgGAGQgNALgQAAIgEAAgABcriIgFAAQgHACgGgCIgMgCQgOgFgGgKQgDgHABgLQACgUAMgJQgFABgEgDQgDgBgDgEIgMgPIgLgTIgEgKIgBgIQgBgLACgKQACgKAFgFQADgDAEgBQAFgBADACQAFADABAIIAAANIgBAHIABAGIADAHQAHAPAHAJQAGAHABADQAEAJgHAHIAAABQAFgDAGABQAJAAAGAHQAEAEAAAGQgBAIgHADQgIADgBACQAIACAGADIAEAEQAFAAACABQAEADACAEQABAEgBAEQgCAFgGADIAAABIgDAHIAAACQgCgEAAgDgACzsaQgGgCgBgIQAAgGAGgEIAFgBIABAAQAHAAADAHQACAHgFAFQgDADgEAAIgFgBgACWtTQgIgBgFgDIgHgDIgHgBQgEAAgCgCQgCgCABgEQACgGAGgDQAGgCAGACIAMAFQAIADASgDQALgCAEgDQAFgDACgGQADgFAAgFQAAgHgGgGQgHgIgQgLQgIgGgHgCIgPgFQgJgEACgIQABgHALgCQAPgCATAJQASAHAJAJQAIAGAIANIAFAKIAAALQgBAKgDAGIgCAEIACABIgIAIQgFAEgKAGIAAgBQgRAKgUAAIgNgBgAA7tvIgJgHQgIgGgCgFQgCgDABgEQAAgEADgCQAEgDAGACIAKAFIAKAGQADADACAFQAEAFgBAFQgBADgCACQgDADgEAAQgEAAgHgFgABet9IgIgFQgEgEgHgDIgNgGQgGgDAAgEQgCgHAKgDQAFgBAJABQAIABAGAEQAHADADADQAFAGAAAGQAAAFgEAFQgDADgDAAIgDgBgACFuQIgFgGQgEgFgIgGQgGgEgLgDQgHgCAAgEQAAgEAHgBQAIgCAGABQAJABALAIQAGAEAFAGQAEAIgDAHQgCADgDABIgBAAQgCAAgEgCg");
	this.shape_1.setTransform(65.7734,99.9789);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#0000CC").s().p("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LIgDADIgBABIgBAOIgMAQIgrA7IgHAJIACAEQACALgDAJQgDAHgGAHIgDADIACACQAJAbAJApIAAADIAEATIAKA1IAFAVIACgBIAAAEIAJgCQALABABAIIgCAJQgBAEACAFIACAIQACADABAJQABAJADAEIAFAKQACAEgDAHQgEAQgOAUQgGAIgEADQgGAEgLAAIgKgBgAi5i3QgBAAAAABQgBAAAAAAQAAABAAAAQgBABAAAAQgGAPgFAVIgJAeQgCAGABACIACAHQADAFADACQACACAFABIAXAGQANADAKAAIAIgCQADgBADgGIATgdIABgHQACgDgCgEIgIgPQgEgGgIgWIgGgBQgCACgDAAQgFABgDgDIgBAAIgIgDIgFgDQgCgBgEABIgIAAIgDgBIgBAAgAjJmKIADALQACAFACABQAEACAEgGIADgDQAFgFABgDIgCgGIgDgBQgGAAgEgHIgCgHQgHAKAAAJgAgqpVQgMAEgDACQgFACgIAKIgMAPIABAEIAAABQABAFgCALQgBATARAUIAHAHQAEACAHABQALADAIAAQARAAAOgIQAVgKAIgVQAGgPgDgPQgBgHgEgHIgGgJQgGgHgEgDQgMgIgPAAQgJAAgTAEgAFthYIhAgLQgUgJgKgCQgMgBgFgBQgLgEgCgHQgBgDADgJIAKgoQAKgjAKgTIAEgFIAEgDQAGgHANgCIABAAIAAgBIgJgcIgHgbIgCgLIgHgaQgBgFgCgBQAAgCgGgCQgFgEgBgDQgBgGgBgBIgFgCQgDgCgDgIIgDgQQAAgJAGgGIAbgHIAIACIAGAEIAIAJQACADADAKIAEAOQgBALgNANQAHAYACANIABAMIAKAoIABAFIABAEIAggHQAKgCAEADQAFACADALQAKAmAMASIAEAHIACAGIgCAEIgEAJQgCAEgBALIgEAPIgFAKQgDAGAAAFIABALQAAAGgFADQgBABgFAAIgDAAgAExjhQgHABgBABQgCABgCAEQgJARgFARIgCAKIgLAjQgBABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABABAAQAAAAABABQAAAAABAAQAAAAABAAQAOADAIAEIAcALQAUAGAVABIAQg5IAAgGQAAgCgEgFQgKgQgLgqgAEMmJIgBAAIgCAEIABACIACAIIAFACIADACIACABQABAAAAAAQABAAAAAAQABAAAAABQAAAAAAAAIAEACQABgCgBgEQgBgFgFgIIgDgEIgDAAIgFABgAgZjwQgTgDgIgHQgHgGgGgTIgQg1QgOgsgFgYIgJgpQgGgYAIgIQADgEAEABQADAAAEAEQAGAHAEAVQALA3AjBqQABAEADAEQADADAIACQBdASBbgIQAXgCAFgKQACgDABgLIABgVQAAgIACgDQADgFAEAAIACAAIABABQAEACABAIQACAKgBAPQgBAPgGAJQgLAUgnAFQgcAEgiAAQg1AAhBgKgADHlgIgBgKIgFgTQgBgDAAgOIAHiIIAAgaQgBgfgEgSQgJgrgcgVQgIgFgCgEQgCgDAAgDQAAgEACgCQAFgDAIADQAYAIAPAWQAHAKAGAQQAIAVACALQACALAAAVIAAAOIgCBmIgBAGIACAnQABARgCALIgGAYIgCAJQgCAGgFAAQgFAAgDgGgAhlozIABAAIgBABIAAgBgAhppPQgHgCAAgJQgBgFAFgJQAMgWAlgcIAQgMQAKgGANgGIAngPIAPgEIACAAIAAAAIAFgPQABgHgBgDIgDgLQgBgGACgEQACgEAFgCQAFgCAEADQAFADADAHQABgFAGABIAJAGQARAOAQAEQAJACASgBQAWgCAIgIQAHgHADgMQANgxgcg6QgEgJAAgFQAAgEACgDQADgEADAAQAEAAAEAEQAFAFAEAIQAcAxgHA3QgEAkgUAQQgOALgaACQgTACgOgDQgSgEgKgLIgPgVIgBgBQAEASgIASQgDAHgFADQgGAEgGgDIgGAEIg2AbQgTALgZAVIgMALQgGAHgEAIIgHALQgFAFgFAAIgDgBgABkqQQgXgDgMgUQgFgJAFgDQAEgDAHAGQAMAKAHACQAMAEALgFQAGgDACgDIADgJQAFgEAFAGQAEADgCAHQgCAHgGAGQgNALgQAAIgEAAgAAkr5IgFAAQgHACgGgCIgMgCQgNgFgGgKQgDgHABgLQACgUAMgJQgFABgEgDQgDgBgDgEIgMgPIgLgTIgEgKIgBgIQgBgLACgKQACgKAFgFQADgDAEgBQAFgBADACQAFADABAIIAAANIgBAHIABAGIADAHQAHAPAGAJQAGAHABADQAEAJgHAHIAAABQAFgDAGABQAJAAAGAHQAEAEAAAGQgBAIgHADQgIADgBACQAIACAGADIAEAEQAFAAACABQAEADACAEQABAEgBAEQgCAFgGADIAAABIgDAHIAAACQgCgEAAgDgAB7sxQgGgCgBgIQAAgGAGgEIAFgBIABAAQAHAAADAHQACAHgFAFQgDADgEAAIgFgBgABetqQgIgBgFgDIgHgDIgHgBQgEAAgCgCQgCgCABgEQACgGAGgDQAGgCAGACIAMAFQAIADASgDQALgCAEgDQAFgDACgGQADgFAAgFQAAgHgGgGQgHgIgQgLQgIgGgHgCIgPgFQgJgEACgIQABgHALgCQAPgCATAJQASAHAJAJQAIAGAIANIAFAKIAAALQgBAKgDAGIgCAEIACABIgIAIQgFAEgKAGIAAgBQgRAKgUAAIgNgBgAADuGIgIgHQgIgGgCgFQgCgDABgEQAAgEADgCQAEgDAGACIAJAFIAKAGQADADACAFQAEAFgBAFQgBADgCACQgDADgEAAQgEAAgHgFgAAmuUIgIgFQgEgEgHgDIgNgGQgGgDAAgEQgBgHAJgDQAFgBAJABQAIABAGAEQAHADADADQAFAGAAAGQAAAFgEAFQgDADgDAAIgDgBgABNunIgFgGQgEgFgIgGQgGgEgLgDQgHgCAAgEQAAgEAHgBQAIgCAGABQAJABALAIQAGAEAFAGQAEAIgDAHQgCADgDABIgBAAQgDAAgDgCg");
	this.shape_2.setTransform(72.081,95.9758);

	this.instance = new lib.CachedBmp_30();
	this.instance.setTransform(55.95,-5.5,0.5,0.5);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#0000CC").s().p("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AgEAFgHIAXgiQAUgeARgOQAFgFAFgBQAFgCAIAAIAIABIABAAIAAgBIAQABIAHgYQAGgVAEgKIAGgLIAKgeQACgFgBgDIgDgHQgCgGACgFIACgIIgCgFQgCgEACgIQAEgNAEgFQAFgIAJgDQAFgBAHACIAAgBIAGAEIAGADIADACQADAEADAMIACANIgEAQIgGAPQgGAMgTADQgIAcgHANIgGAMIgQArIAQACQAKACAEAEQADAEgBAKQgDAoAFAVQADALgBAEIgKAKQgDAEgFAIQgFAJgDAEIgIAIQgGAFgBAEIgDALQgDAGgEABIgBAAQgDAAgFgDgAndkwQgDAAgDADQgOANgLAPIgFAJIgWAdQAAAAgBABQAAAAAAABQgBAAAAABQAAAAAAABIADADQAMAIAGAGIAYAUQAQAMAUAHIAhgwIACgFQABgCgBgGQgFgTADgrIgugFIgIgBIAAAAgAmLncIgCAEIgCAJIACAGIABADIACACIACADIABAEQADgBABgEQADgHAAgKQABgDgCgCQgBgDgFgCIgCAAgACkjJQgCgDgDgJIgKgnQgKgjABgWIAAgHIACgEQACgJAKgIIABgBIgBgBIgVgTQgOgNgGgHIgHgJIgTgTQgDgEgDAAIgHAAQgGgBgDgCQgEgFgCAAIgFABQgDgBgHgFIgKgMIAAgBQgEgHABgIIAVgUIAHgCIAIAAIALAEIALAJIAKAKQAFAKgFASQATARAHAKIAHAKIAdAeIADADIADAEIAZgXQAHgGAFAAQAFABAIAHQAcAcATAJIAIAEIAEAFIABAEIABAKQAAAFAEAJQADAKABAFIABALQAAAIADADIAGAJQADAGgCAFQgCACgGADIg9AWQgWADgKADIgQAHIgGAAQgGAAgEgDgACplCQgGAFAAABIgBAGQABAUAEARIADAKQAFAUADAPQAAABAAABQAAAAAAABQAAAAAAABQABAAAAAAQABAAAAABQABAAAAAAQABAAAAAAQABgBABAAQAOgEAIgBIAegFQAUgEATgKIgQg5IgCgFQgBgCgFgCQgRgIgfgggAA8m1IAGAAIACAAIADAAIADgBIAFAAQAAgCgDgDIgDgDIgJgGIgFgBQgDABgEADIgBABIABAEIACADIAAgBQAEAEACABgAjkj4QgSgDgIgGQgHgGgHgUIgQg0QgNgsgGgZIgIgpQgHgXAIgJQADgDAEAAQADAAAEAEQAHAIAEAUQALA3AjBqQABAFADAEQADACAIACQBeATBagIQAXgCAGgLQABgDABgLIABgVIABgIIADg1IgEgQQgBgEAAgNIAGiIIAAgaQAAgggEgRQgKgrgcgVQgIgGgCgDQgCgDAAgEQAAgDADgCQAFgEAHADQAYAJAPAVQAGAKAHARQAIAVACALQABAKAAAWIAAAOIgCBlIAAAGIACAnIAAAVIAAAEIAAAjQAAAegEAYQgBAJgEANQgCAHgCADIgCACIgDAGQgKAUgnAFQgdAEgiAAQg1AAhCgKgAjwnZQgXAAgOgKQgKgHgJgPQgKgQgCgQIAAgJQggAegeAXIgIgDIgGgEQABgEAFgCQApghAhghQAEgEAEgCIAAgDQACgHAHgKIALgOQAOgNAggEQAdgFAQAHQAJAEAJAHQAQAPAHASQADAIABAIQABAMgDAOQgFAVgQAQIgJAJIACADIgBAAIgFADIgFABIgHAFIgLABIAAACQgSAHgSAAIgFAAgAj1pcQgLADgDACQgFADgJAJIgMAPIABAFIAAAAQABAFgBALQgCAUASAUIAHAGQAEADAGABQALACAJAAQAQAAAPgHQAVgLAJgVQAGgPgDgOQgCgHgDgHIgHgKQgGgHgEgCQgLgIgQAAQgKAAgTAEgAkypWIgEgEIgCAAQgDgDAAgEQAAgGAEgIQAMgWAlgdIAQgLQALgHANgFIAngPIAQgEIACAAIAAgBIAEgOQABgHgBgEIgCgKQgBgGABgEQACgFAFgCQAGgBAEACQAEADADAIQABgFAHABIAJAFQAQAPAQAEQAJACATgBQAVgCAJgIQAHgIACgMQANgxgcg6QgEgJAAgFQAAgEADgDQACgDAEAAQADAAAFADQAFAGAEAHQAaAygHA3QgDAjgTAQQgPALgaADQgSABgOgCQgSgFgLgLIgPgVIgBgBQAFATgIARQgEAIgEADQgHAEgFgDIgHADIg2AcQgUALgYAUIgMAMQgHAHgDAHIgIAMIAAAAIAEAEIgBAAQgBAAAAgBQgBAAgBAAQAAAAgBgBQAAAAAAAAQgEACgEAAIgCAAgAhmqYQgWgCgNgVQgEgJAFgDQAEgDAHAGQAMAKAHACQAMAEAKgEQAHgDABgEIAEgIQAFgFAFAGQADAEgCAHQgCAGgGAGQgMALgRAAIgEAAgAimsBIgFABQgHABgFgBIgMgDQgPgEgFgKQgEgIABgKQACgUAMgJQgEABgFgDQgDgCgCgDIgMgQIgLgTIgEgJIgCgJQAAgKACgKQACgLAEgEQADgEAFgBQAEAAAEACQAFACABAIIgBANIAAAHIABAHIACAGQAIAQAHAIQAFAHABADQAFAJgHAHIgBABQAFgCAGAAQAKABAGAGQAEAEAAAHQgBAIgIACQgIAEAAACQAIABAFAEIAEADQAFAAADACQAEACABAEQACAFgCAEQgBAEgGAEIAAAAIgDAHIgBACQgCgEAAgDgAhOs4QgGgDgBgHQAAgHAGgDIAEgBIABAAQAIAAACAHQADAGgFAFQgEADgEAAIgEAAgAhrtyQgJgBgFgDIgGgDIgHAAQgEAAgCgDQgCgCABgDQABgHAHgCQAFgDAHADIAMAFQAIADARgDQALgCAFgEQAEgDADgGQADgEAAgGQgBgGgFgGQgIgJgQgKQgIgGgGgCIgPgFQgJgEABgIQACgIALgCQAPgCATAJQARAHAKAJQAHAHAJANIAEAJIABALQgBAKgDAGIgDAFIADABIgJAIQgEAEgKAFIAAgBQgSAKgUAAIgMgBgAjHuOIgIgHQgIgGgCgEQgCgDAAgEQABgEACgCQAEgEAHACIAJAFIAKAHQADACADAFQADAFgBAFQAAAEgDACQgDACgDAAQgFAAgHgFgAikubIgHgGQgEgDgIgEIgMgFQgGgDgBgFQgBgGAKgEQAEgBAJABQAJACAGADQAHADADAEQAEAFAAAHQAAAFgDAEQgDADgEAAIgDAAgAh9uvIgFgGQgDgFgIgFQgGgEgLgEQgIgCAAgEQABgEAHgBQAHgBAGAAQAJACALAIQAHAEAEAGQAFAIgEAGQgBAEgDAAIgCAAQgCAAgEgCg");
	this.shape_3.setTransform(117.2443,95.4368);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#0000CC").s().p("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gDQgCgCgDgHQgDgLAAgFIAAAAQAAgJAFgHIAcgGIAIACIAGAEIAIAJIAFANIADAOQAAALgNANQAHAYACANIAAAMIAKAoIACAFIAAAEIAhgHQAJgCAFADQAFADACAJQAKAnANASQABAEADADIABAGIgBAFIgEAIIgEAOIgEAPIgEAKQgEAHABAFIAAALQAAAGgEADIgFABIgEgBgAGZjHQgIABAAABQgCABgCAEQgJARgFARIgCAKQgGAUgGAPQAAABAAAAQgBAAAAABQAAAAAAABQAAAAABABQAAAAABABQAAAAAAAAQABAAABABQAAAAABAAQAOADAHAEIAdALQATAGAWAAIAQg9QAAgDgEgFQgKgQgMgqgAFxlsIAAADIABABIACAGIAFADIADACIACAAQABAAAAAAQAAAAABABQAAAAAAAAQAAAAABABIAEABQABgBgBgEIgBgEIgFgJIgEgEQgDgBgEACIgCAAgAgHhnIABgDIgBADIgBAFIgBABIACgGgAE2lVIgBgKIgFgSQgBgEAAgNIAHiIIAAgaQgBgggEgRQgJgrgcgVQgIgGgCgDQgCgDAAgEQAAgDACgCQAFgEAIADQAYAJAPAVQAHAKAGARQAIAVACALQACAKAAAWIAAAOIgCBlIgBAGIACAnIABAJQAAALgCAIIgGAYIgCAKQgCAGgFAAQgFAAgDgHgAAJonIABgBIgBACIAAgBgAAFpDQgGgDAAgIQgBgGAEgIQAMgWAlgdIAQgLQAKgHANgFIAogPIAPgEIACAAIAAgBIAFgOQABgHgBgEIgDgKQgBgGACgEQACgFAFgCQAFgBAEACQAFADADAIQABgFAGABIAJAFQARAPAQAEQAJACASgBQAWgCAIgIQAHgIADgMQANgxgcg6QgEgJAAgFQAAgEACgDQADgDADAAQAEAAAEADQAFAGAEAHQAcAygHA3QgEAjgUAQQgOALgaADQgTABgOgCQgSgFgKgLIgPgVIgBgBQAEATgIARQgDAIgFADQgGAEgGgDIgGADIg3AcQgTALgZAUIgMAMQgGAHgEAHIgHAMQgFAEgFAAIgDAAgADTqFQgXgCgMgVQgFgJAFgDQAEgDAHAGQAMAKAHACQAMAEALgEQAGgDACgEIADgIQAFgFAFAGQAEAEgCAHQgCAGgGAGQgNALgQAAIgEAAgACTruIgFABQgHABgGgBIgMgDQgOgEgGgKQgDgIABgKQACgUAMgJQgFABgEgDQgDgCgDgDIgMgQIgLgTIgEgJIgBgJQgBgKACgKQACgLAFgEQADgEAEgBQAFAAADACQAFACABAIIAAANIgBAHIABAHIADAGQAHAQAHAIQAGAHABADQAEAJgHAHIAAABQAFgCAGAAQAJABAGAGQAEAEAAAHQgBAIgHACQgIAEgBACQAIABAGAEIAEADQAFAAACACQAEACACAEQABAFgBAEQgCAEgGAEIAAAAIgDAHIAAACQgCgEAAgDgADqslQgGgDgBgHQAAgHAGgDIAFgBIABAAQAHAAADAHQACAGgFAFQgDAEgEAAIgFgBgADNtfQgIgBgFgDIgHgDIgHAAQgEAAgCgDQgCgCABgDQACgHAGgCQAGgDAGADIAMAFQAIADASgDQALgCAEgEQAFgDACgGQADgEAAgGQAAgGgGgGQgHgJgQgKQgIgGgHgCIgPgFQgJgEACgIQABgIALgCQAPgCATAJQASAHAJAJQAIAHAIANIAFAJIAAALQgBAKgDAGIgCAFIACABIgIAIQgFAEgKAFIAAgBQgRAKgUAAIgNgBgAByt7IgJgHQgIgGgCgEQgCgDABgEQAAgEADgCQAEgEAGACIAKAFIAKAHQADACACAFQAEAFgBAFQgBAEgCACQgDACgEAAQgEAAgHgFgACVuIIgIgGQgEgDgHgEIgNgFQgGgDAAgFQgCgGAKgEQAFgBAJABQAIACAGADQAHADADAEQAFAFAAAHQAAAFgEAEQgDADgDAAIgDAAgAC8ucIgFgGQgEgFgIgFQgGgEgLgEQgHgCAAgEQAAgEAHgBQAIgBAGAAQAJACALAIQAGAEAFAGQAEAIgDAGQgCAEgDAAIgBAAQgDAAgDgCg");
	this.shape_4.setTransform(133.2813,102.6258);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#0000CC").s().p("ACePXIgqgBIhsgHQgfgCgJgOQgEgHgBgPIgHhcQgCgTAFgHQAJgRAjgBIBngCQAUAAALACQAMADAQALIAuAiQALAHAGABQAFABAPgCQAkgEAgAQQAVALAOASQAOAUAAAVQAAALgCAIIgEACQgbAKgbAGQgqAIhDAAIgmAAgABlM7Ih6AFQAJAvACAyQABAHADADIABABQAAAEADACQACACAHAAIANAAIAGAAIAGAAICiAEQAoABAXgCQAXgBATgEIACAAQANAAAHgEIAKgHIADgCQgBgJgFgIQgQgWgfgHQgXgGggAFQgNABgFgDIgJgJQgDgFgLgHIgtgcQgIgFgFgBQgGgCgOAAIgGAAgAgdMUQgHgEgBgPQgBgTACgoQABgogBgUQgBgSgFglIgSiNQgCgXACgMIACAAIABgFIARg+IAMgWIADgCIgBAAIgBgBIgGgFIgGgFIgBAAIAAgBIgIgRQgBgEAAgVIAAgIIABgQIABgHIAEgLIAAAAIACgEQALgUAOgMIgBAAIhNkZQgFgPAAgKQAAgKAGgQQAJgcAQglIAEgHIABgCIAAAAIABgDIAAAAIACgCIABgBIAEgDIADgBIAEAAIACAAIADACIAAAAIABABIAAAAQAAAAAAABQABAAAAAAQAAABAAAAQABAAAAABIAAAAIABAEIAAAEIAAABIgBABIAAACIgBAAIgBADIAAAAIgBACIgDAFIAAADIgCACQgQAfgDAhIgBAEIgDARIAAgCIgBAMIAAACIABALIABAGQABAIAKAYQALAcAKAyQALA6AHAWIALAgQAFATgBAOIgCAIIAKgHQASgJAfgBQAaAAAVAFIARAIIAHACIABACIAKAMIAHAEIABAAIABgJIAAgOIAAgCIAAgDIAAgFIAAgCIAAgBIABgCIgQhaIgGglQgEgagBggIgGhrQAAgQACgGQADgGAIgGIAOgJIALgJQAHgEAFACQAFABACAFQACAFgBAFQgCAIgKAIIgMALQgDAFABAKIACBKIADA9IAEAjIADAYQAAAvAKAyIACAMIACASIgFAfIAAADIAAACIgBAAQADAMgCAPIgDAXIgEAQIgBADIgDACIgHAIIgGALIgIAIQgGAHgDARQgBAIABAEIgGAcIAAAAQgJAqgHAvQgKA7gQBxIgLBPQgDAQgEAFQgFAHgQAFQgUAIgcA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ABAHIACAGQAIAQAGAIQAFAHABADQAFAJgHAHIgBABQAFgCAGAAQAKABAGAGQAEAEAAAHQgBAIgIACQgIAEAAACQAIABAFAEIAEADQAFAAADACQAEACABAEQACAFgCAEQgBAEgGAEIAAAAIgDAHIgBACQgCgEAAgDgAB7suQgGgDgBgHQAAgHAGgDIAEgBIABAAQAIAAACAHQADAGgFAFQgEADgEAAIgEAAgABetoQgJgBgFgDIgGgDIgHAAQgEAAgCgDQgCgCABgDQABgHAHgCQAFgDAHADIAMAFQAIADARgDQALgCAFgEQAEgDADgGQADgEAAgGQgBgGgFgGQgIgJgQgKQgIgGgGgCIgPgFQgJgEABgIQACgIALgCQAPgCATAJQARAHAKAJQAHAHAJANIAEAJIABALQgBAKgDAGIgDAFIADABIgJAIQgEAEgKAFIAAgBQgSAKgUAAIgMgBgAACuEIgHgHQgIgGgCgEQgCgDAAgEQABgEACgCQAEgEAHACIAIAFIAKAHQADACADAFQADAFgBAFQAAAEgDACQgDACgDAAQgFAAgHgFgAAluRIgHgGQgEgDgIgEIgMgFQgGgDAAgFQgBgGAJgEQAEgBAJABQAJACAGADQAHADADAEQAEAFAAAHQAAAFgDAEQgDADgEAAIgDAAgABMulIgFgGQgDgFgIgFQgGgEgLgEQgIgCAAgEQABgEAHgBQAHgBAGAAQAJACALAIQAHAEAEAGQAFAIgEAGQgBAEgDAAIgCAAQgCAAgEgCg");
	this.shape_5.setTransform(142.4881,101.139);

	this.instance_1 = new lib.CachedBmp_31();
	this.instance_1.setTransform(127.55,-0.95,0.5,0.5);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#0000CC").s().p("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MABgFQADgJAHgFQAEgCAHgBQABgDADgEQAWgmAPgjQACgGADgCQAFgEAEAEQADADgDAIQgUAsgUAjIACABQAFACAHAJIAFAKQABADAAALIAAAPQgCALgRAIIAAABQABAZgCAMIgCAMIgBAqIAAAJIAhABQAKABADAEQAEAEAAAKQAAAoAHAUQADALgBAEQAAACgIAJIgHANIgIANIgHAJQgFAFgBAFIgCAKQgCAHgFABIgCAAIgHgCgAmzjuQgCABgDADQgNAOgJAQIgFAJQgKASgKANQAAAAgBABQAAAAAAABQAAAAAAABQAAAAAAABIADADQAMAGAHAGIAZASQARALAVAGIAdgzIACgFQAAgCgCgGQgGgSAAgsIgugBIgIgBIgBAAgAmnmXIAAAEIABAHIAEAEIACADIACABIADACIADACQABgBAAgEQABgGgDgIQAAgBAAgBQgBAAAAgBQAAAAgBgBQAAAAAAAAQgDgCgFAAIgBAAgABSjMQgGgBgJgGQgmgZgUgQQgFgFgCgEIAAgKQAGgTAKgPIgCgBIgMgCIhhgKIgTgBIgLgCIgCAGQgDAFgIADQgRAIgOgFQgLgEgKgOQgHgKABgJQAAgGAEgEQADgDADgBIgghAIgMgVIgRgaIgCAAQgUAIgWgBQgXAAgOgKQgKgGgJgPQgKgQgCgRQgCgSAIgMIACgDIADgFIABgGQACgHAHgJIALgPQAOgMAggEQAdgFAQAGQAJAEAJAIQAQAOAHASQADAIABAIQABANgDANQgFAWgQAQIgJAJIADAFIAQAWQAGAIAKATIAeA6IAEAIIADAAQAGAAAFADIAEADQAFAFACAIIACADIACgBQAZgBAjADIA7AHQAUACAMADQAAgGACgDQAEgLAIADIAIAFQADACAFAAIAIAAIANACQAJACAEgBIALgCQAFAAAGAFQANAKANAUQAGAIABAFQADAKgJAQQgIASgMASIgJAKQgFAFgLADQgHACgFAAIgCAAgABPlBQgIABgXAAIgCAFQABADgBADQgCAFgDACIgBAAQgDAGgCABIgFADQgBACgBAFIgDAHQgBABAAAAQAAABAAAAQgBAAAAABQAAAAAAABQAAAAAAABQABAAAAABQAAAAAAAAQABABAAAAQAMALASAMIAZATQAFADACABIAIAAIAIgDIAFgGIANgTQAIgMADgJQACgDAAgFQgBgDgEgFIgVgcIgGgEQgCgCgFAAIgQADgAiblEIAJABQAEAAACgCQADgDgDgGIgBgEQgCgGgDgCIgFAAIgBAEQgDAFgGACQgEABgDgBQAGAJAHACgAkmpOQgLAEgDACQgFACgJAKIgMAPIABAEIAAABQABAFgBALQgCATASAUIAHAHQAEACAGABQALADAJAAQAQAAAPgIQAVgKAJgVQAGgPgDgPQgCgHgDgHIgHgJQgGgHgEgDQgLgIgQAAQgKAAgTAEgAkVjpQgSgDgIgHQgHgGgHgTIgQg1IgKgkIgJggIgIgpQgHgYAIgIQADgEAEABQADAAAEAEQAHAHAEAVQAGAeANAuIAbBVQABAEADAEQADADAIACQBeASBagIQAXgCAGgKQABgDABgLIABgVQAAgIACgDQAEgGAGABQAEACABAJQACAKgBAPQgBAPgFAJQgLAUgnAFQgdAEghAAQg1AAhDgKgAgzlZIgCgKIAAgCIgEgRQgBgDAAgOIAGiIIAAgaQAAgfgEgSQgKgrgcgVQgIgFgCgEQgCgDAAgDQAAgEADgCQAFgDAHADQAYAIAPAWQAHAKAHAQQAIAVACALQABALAAAVIAAAOIgCBmIAAAGIACAnQABARgDALIgEAVIgBADIgCAJQgCAGgGAAQgEAAgDgGgAlkpIQgIgCAAgJQAAgFAEgJQAMgWAlgcIAQgMQALgGANgGIAngPIAQgEIACAAIAAAAIAEgPQABgHgBgDIgCgLQgBgGABgEQACgEAFgCQAGgCAEADQAEADADAHQABgFAHABIAJAGQAQAOAQAEQAJACATgBQAVgCAJgIQAHgHACgMQANgxgcg6QgEgJAAgFQAAgEADgDQACgEAEAAQADAAAFAEQAFAFAEAIQAbAxgHA3QgDAkgUAQQgPALgaACQgSACgOgDQgSgEgLgLIgPgVIgBgBQAFASgIASQgEAHgEADQgHAEgFgDIgHAEIg2AbQgUALgYAVIgMALQgHAHgDAIIgIALQgEAFgFAAIgDgBgAiXqJQgWgDgNgUQgEgJAFgDQAEgDAHAGQAMAKAHACQAMAEAKgFQAHgDABgDIAEgJQAFgEAFAGQADADgCAHQgCAHgGAGQgMALgRAAIgEAAgAjXryIgFAAQgHACgFgCIgMgCQgPgFgFgKQgEgHABgLQACgUAMgJQgEABgFgDQgDgBgCgEIgMgPIgLgTIgEgKIgCgIQAAgLACgKQACgKAEgFQADgDAFgBQAEgBAEACQAFADABAIIgBANIAAAHIABAGIACAHQAIAPAHAJQAFAHABADQAFAJgHAHIgBABQAFgDAGABQAKAAAGAHQAEAEAAAGQgBAIgIADQgIADAAACQAIACAFADIAEAEQAFAAADABQAEADABAEQACAEgCAEQgBAFgGADIAAABIgDAHIgBACQgCgEAAgDgAh/sqQgGgCgBgIQAAgGAGgEIAEgBIABAAQAIAAACAHQADAHgFAFQgEADgEAAIgEgBgAictjQgJgBgFgDIgGgDIgHgBQgEAAgCgCQgCgCABgEQABgGAHgDQAFgCAHACIAMAFQAIADARgDQALgCAFgDQAEgDADgGQADgFAAgFQgBgHgFgGQgIgIgQgLQgIgGgGgCIgPgFQgJgEABgIQACgHALgCQAPgCATAJQARAHAKAJQAHAGAJANIAEAKIABALQgBAKgDAGIgDAEIADABIgJAIQgEAEgKAGIAAgBQgRAKgVAAIgMgBgAj4t/IgIgHQgIgGgCgFQgCgDAAgEQABgEACgCQAEgDAHACIAJAFIAKAGQADADADAFQADAFgBAFQAAADgDACQgDADgDAAQgFAAgHgFgAjVuNIgHgFQgEgEgIgDIgMgGQgGgDgBgEQgBgHAKgDQAEgBAJABQAJABAGAEQAHADADADQAEAGAAAGQAAAFgDAFQgDADgDAAIgEgBgAiuugIgFgGQgDgFgIgGQgGgEgLgDQgIgCAAgEQABgEAHgBQAHgCAGABQAJABALAIQAHAEAEAGQAFAIgEAHQgBADgDABIgCAAQgCAAgEgCg");
	this.shape_6.setTransform(189.6743,101.6131);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#0000CC").s().p("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BgNQACgNAHgFQAFgEAFAAIAEABIgBgFIgDgSIgEgkIgBgbIgDgWIgFgYIgBgKIgEAAQgVAAgOgKQgKgGgJgPQgLgQgCgRQgBgSAHgMIACgDIADgFIACgGQABgHAHgJIAMgPQAOgMAfgEQAdgFAQAGQAJAEAJAIQAQAOAGASQADAIABAIQACANgEANQgFAWgPAQIgKAJIABABIgLAHIgMAIIgBgCIgDAAIgQAFIAEAXIADAUIABAXQgBAOABAGIACAPIACAVIACAUIACAKIgBAEIAMAMIADABQAEAGgBAGQABAGgFAIIgBADIADABIALALQBDAIBCgGQALgBAHgCQAAgBAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBIAFgFQADgEACgIIAEgSIAAgBQADgUABgKIgCgaIgBgbIgCAAIgBgPIAHiIIAAgaQgBgfgEgSQgJgrgcgVQgIgFgCgEQgCgDAAgDQAAgEACgCQAFgDAIADQAYAIAPAWQAHAKAGAQQAIAVACALQACALAAAVIAAAOIgCBmIgBAGIACAnQABARgCALIAAABIgCAAIACARQACAbgBAQQgBAYgHASIgFANIgFAKQgLAUgnAFQgQACgSABQgDgCgFAAIgLAAIgKgBIgHAEIgIACIACgCIgagBIAFAGIAlAvIAUAaIAIgFQAKgEAEAHIACAJQABAEAEADIAGAGIAHALQAFAHAEACIAJAHQADADABAIQABAMgCAQIgBALIAAABIgDAEIgCACIgEAOQgGAFgNAEQgSAFgVAEIgKABgACPhlIgHADIgEACQAAAAAAABQgBAAAAAAQAAABAAABQAAAAAAABQABAQAEAUIAEAgIACAIIAGAFIAHAEIAIgBIAXgEQAOgCAJgFQADgBADgDQACgDABgGIAEgjIAAgHQgBgDgDgDIgNgKQgHgEgQgRIgFACIgFAFQgEACgEgBIgBAAQgGABgCgBIgGAAIgGACgAAokCIAGAHQADADADAAQAEAAACgGIACgEQADgGgBgDIgDgEQgBABAAAAQAAAAgBAAQAAABgBAAQAAAAgBAAQgFACgGgDQgDgCgCgDQgCALADAGgAANo+QgMAEgCACQgFACgIAKIgMAPIABAEIAAABQABAFgCALQgBATARAUIAHAHQADACAHABQALADAIAAQARAAAPgIQAVgKAIgVQAGgPgDgPQgBgHgEgHIgGgJQgGgHgEgDQgMgIgQAAQgJAAgTAEgAHBkUIAAgDIgCgFIABABQAGAIABAFIABAGIgHgMgAgxo4QgHgCAAgJQgBgFAFgJQAMgWAlgcIAPgMQAKgGANgGIAogPIAPgEIACAAIAAAAIAFgPQABgHgBgDIgDgLQgBgGACgEQACgEAFgCQAFgCAEADQAFADADAHQABgFAGABIAJAGQARAOAQAEQAJACASgBQAWgCAIgIQAHgHADgMQANgxgcg6QgEgJAAgFQAAgEACgDQADgEADAAQAEAAAEAEQAFAFAEAIQAcAxgHA3QgEAkgUAQQgOALgaACQgTACgOgDQgSgEgKgLIgPgVIgBgBQAEASgIASQgDAHgFADQgGAEgGgDIgGAEIg3AbQgTALgYAVIgMALQgGAHgEAIIgHALQgFAFgFAAIgDgBgACcp5QgXgDgMgUQgFgJAFgDQAEgDAHAGQAMAKAHACQAMAEALgFQAGgDACgDIADgJQAFgEAFAGQAEADgCAHQgCAHgGAGQgNALgQAAIgEAAgABcriIgFAAQgHACgGgCIgMgCQgOgFgGgKQgDgHABgLQACgUAMgJQgFABgEgDQgDgBgDgEIgMgPIgLgTIgEgKIgBgIQgBgLACgKQACgKAFgFQADgDAEgBQAFgBADACQAFADABAIIAAANIgBAHIABAGIADAHQAHAPAHAJQAGAHABADQAEAJgHAHIAAABQAFgDAGABQAJAAAGAHQAEAEAAAGQgBAIgHADQgIADgBACQAIACAGADIAEAEQAFAAACABQAEADACAEQABAEgBAEQgCAFgGADIAAABIgDAHIAAACQgCgEAAgDgACzsaQgGgCgBgIQAAgGAGgEIAFgBIABAAQAHAAADAHQACAHgFAFQgDADgEAAIgFgBgACWtTQgIgBgFgDIgHgDIgHgBQgEAAgCgCQgCgCABgEQACgGAGgDQAGgCAGACIAMAFQAIADASgDQALgCAEgDQAFgDACgGQADgFAAgFQAAgHgGgGQgHgIgQgLQgIgGgHgCIgPgFQgJgEACgIQABgHALgCQAPgCATAJQASAHAJAJQAIAGAIANIAFAKIAAALQgBAKgDAGIgCAEIACABIgIAIQgFAEgKAGIAAgBQgRAKgUAAIgNgBgAA7tvIgJgHQgIgGgCgFQgCgDABgEQAAgEADgCQAEgDAGACIAKAFIAKAGQADADACAFQAEAFgBAFQgBADgCACQgDADgEAAQgEAAgHgFgABet9IgIgFQgEgEgHgDIgNgGQgGgDAAgEQgCgHAKgDQAFgBAJABQAIABAGAEQAHADADADQAFAGAAAGQAAAFgEAFQgDADgDAAIgDgBgACFuQIgFgGQgEgFgIgGQgGgEgLgDQgHgCAAgEQAAgEAHgBQAIgCAGABQAJABALAIQAGAEAFAGQAEAIgDAHQgCADgDABIgBAAQgCAAgEgCg");
	this.shape_7.setTransform(203.8234,103.9789);

	this.instance_2 = new lib.CachedBmp_32();
	this.instance_2.setTransform(192.45,0,0.5,0.5);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#0000CC").s().p("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gHQAAgEAFgHIAXgiQAUgeARgOQAFgFAFgBQAFgCAIAAIAIABIABAAIAAgBIAQABIAHgYQAGgVAEgKIAGgLIAKgeQACgFgBgDIgDgHQgCgGACgFIACgIIgCgFQgCgEACgIQAEgNAEgFQAFgIAJgDQAFgBAHACIAAgBIAGAEIAGADIADACQADAEADAMIACANIgEAQIgGAPQgGAMgTADQgIAcgHANIgGAMIgQArIAQACQAKACAEAEQADAEgBAKQgDAoAFAVQADALgBAEIgKAKQgDAEgFAIQgFAJgDAEIgIAIQgGAFgBAEIgDALQgDAGgEABIgBAAQgDAAgFgDgAndkwQgDAAgDADQgOANgLAPIgFAJIgWAdQAAAAgBABQAAAAAAABQgBAAAAABQAAAAAAABIADADQAMAIAGAGIAYAUQAQAMAUAHIAhgwIACgFQABgCgBgGQgFgTADgrIgugFIgIgBIAAAAgAmLncIgCAEIgCAJIACAGIABADIACACIACADIABAEQADgBABgEQADgHAAgKQABgDgCgCQgBgDgFgCIgCAAgACkjJQgCgDgDgJIgKgnQgKgjABgWIAAgHIACgEQACgJAKgIIABgBIgBgBIgVgTQgOgNgGgHIgHgJIgTgTQgDgEgDAAIgHAAQgGgBgDgCQgEgFgCAAIgFABQgDgBgHgFIgKgMIAAgBQgEgHABgIIAVgUIAHgCIAIAAIALAEIALAJIAKAKQAFAKgFASQATARAHAKIAHAKIAdAeIADADIADAEIAZgXQAHgGAFAAQAFABAIAHQAcAcATAJIAIAEIAEAFIABAEIABAKQAAAFAEAJQADAKABAFIABALQAAAIADADIAGAJQADAGgCAFQgCACgGADIg9AWQgWADgKADIgQAHIgGAAQgGAAgEgDgACplCQgGAFAAABIgBAGQABAUAEARIADAKQAFAUADAPQAAABAAABQAAAAAAABQAAAAAAABQABAAAAAAQABAAAAABQABAAAAAAQABAAAAAAQABgBABAAQAOgEAIgBIAegFQAUgEATgKIgQg5IgCgFQgBgCgFgCQgRgIgfgggAA8m1IAGAAIACAAIADAAIADgBIAFAAQAAgCgDgDIgDgDIgJgGIgFgBQgDABgEADIgBABIABAEIACADIAAgBQAEAEACABgAjkj4QgSgDgIgGQgHgGgHgUIgQg0QgNgsgGgZIgIgpQgHgXAIgJQADgDAEAAQADAAAEAEQAHAIAEAUQALA3AjBqQABAFADAEQADACAIACQBeATBagIQAXgCAGgLQABgDABgLIABgVIABgIIADg1IgEgQQgBgEAAgNIAGiIIAAgaQAAgggEgRQgKgrgcgVQgIgGgCgDQgCgDAAgEQAAgDADgCQAFgEAHADQAYAJAPAVQAGAKAHARQAIAVACALQABAKAAAWIAAAOIgCBlIAAAGIACAnIAAAVIAAAEIAAAjQAAAegEAYQgBAJgEANQgCAHgCADIgCACIgDAGQgKAUgnAFQgdAEgiAAQg1AAhCgKgAjwnZQgXAAgOgKQgKgHgJgPQgKgQgCgQIAAgJQggAegeAXIgIgDIgGgEQABgEAFgCQApghAhghQAEgEAEgCIAAgDQACgHAHgKIALgOQAOgNAggEQAdgFAQAHQAJAEAJAHQAQAPAHASQADAIABAIQABAMgDAOQgFAVgQAQIgJAJIACADIgBAAIgFADIgFABIgHAFIgLABIAAACQgSAHgSAAIgFAAgAj1pcQgLADgDACQgFADgJAJIgMAPIABAFIAAAAQABAFgBALQgCAUASAUIAHAGQAEADAGABQALACAJAAQAQAAAPgHQAVgLAJgVQAGgPgDgOQgCgHgDgHIgHgKQgGgHgEgCQgLgIgQAAQgKAAgTAEgAkypWIgEgEIgCAAQgDgDAAgEQAAgGAEgIQAMgWAlgdIAQgLQALgHANgFIAngPIAQgEIACAAIAAgBIAEgOQABgHgBgEIgCgKQgBgGABgEQACgFAFgCQAGgBAEACQAEADADAIQABgFAHABIAJAFQAQAPAQAEQAJACATgBQAVgCAJgIQAHgIACgMQANgxgcg6QgEgJAAgFQAAgEADgDQACgDAEAAQADAAAFADQAFAGAEAHQAaAygHA3QgDAjgTAQQgPALgaADQgSABgOgCQgSgFgLgLIgPgVIgBgBQAFATgIARQgEAIgEADQgHAEgFgDIgHADIg2AcQgUALgYAUIgMAMQgHAHgDAHIgIAMIAAAAIAEAEIgBAAQgBAAAAgBQgBAAgBAAQAAAAgBgBQAAAAAAAAQgEACgEAAIgCAAgAhmqYQgWgCgNgVQgEgJAFgDQAEgDAHAGQAMAKAHACQAMAEAKgEQAHgDABgEIAEgIQAFgFAFAGQADAEgCAHQgCAGgGAGQgMALgRAAIgEAAgAimsBIgFABQgHABgFgBIgMgDQgPgEgFgKQgEgIABgKQACgUAMgJQgEABgFgDQgDgCgCgDIgMgQIgLgTIgEgJIgCgJQAAgKACgKQACgLAEgEQADgEAFgBQAEAAAEACQAFACABAIIgBANIAAAHIABAHIACAGQAIAQAHAIQAFAHABADQAFAJgHAHIgBABQAFgCAGAAQAKABAGAGQAEAEAAAHQgBAIgIACQgIAEAAACQAIABAFAEIAEADQAFAAADACQAEACABAEQACAFgCAEQgBAEgGAEIAAAAIgDAHIgBACQgCgEAAgDgAhOs4QgGgDgBgHQAAgHAGgDIAEgBIABAAQAIAAACAHQADAGgFAFQgEADgEAAIgEAAgAhrtyQgJgBgFgDIgGgDIgHAAQgEAAgCgDQgCgCABgDQABgHAHgCQAFgDAHADIAMAFQAIADARgDQALgCAFgEQAEgDADgGQADgEAAgGQgBgGgFgGQgIgJgQgKQgIgGgGgCIgPgFQgJgEABgIQACgIALgCQAPgCATAJQARAHAKAJQAHAHAJANIAEAJIABALQgBAKgDAGIgDAFIADABIgJAIQgEAEgKAFIAAgBQgSAKgUAAIgMgBgAjHuOIgIgHQgIgGgCgEQgCgDAAgEQABgEACgCQAEgEAHACIAJAFIAKAHQADACADAFQADAFgBAFQAAAEgDACQgDACgDAAQgFAAgHgFgAikubIgHgGQgEgDgIgEIgMgFQgGgDgBgFQgBgGAKgEQAEgBAJABQAJACAGADQAHADADAEQAEAFAAAHQAAAFgDAEQgDADgEAAIgDAAgAh9uvIgFgGQgDgFgIgFQgGgEgLgEQgIgCAAgEQABgEAHgBQAHgBAGAAQAJACALAIQAHAEAEAGQAFAIgEAGQgBAEgDAAIgCAAQgCAAgEgCg");
	this.shape_8.setTransform(252.7443,100.8368);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#0000CC").s().p("AEKPLIipgKQgfgCgKgOQgEgHAAgPIgIhcQgBgTAFgHQAJgRAjgBIBogCQAUAAAKACQAMADARALIAtAiQAMAHAGABQAEABAQgCQAkgEAgAQQAVALANASQAOAUABAVQAAAXgOAMQgKAJgYADQgcADgmAAQgiAAgpgDgAC/MtIh7AFQAJAvACAyQAAAHADADQACADAIAAQA7AGAvABIBLAGQBEAGBFgIQAIgBADgEQAEgEgBgFQAAgMgHgLQgPgWgfgHQgXgGghAFQgMABgFgDIgJgJQgEgFgLgHIgsgcQgJgFgEgBQgHgCgNAAIgGAAgAkONuQgMgEgOgUQgfgugjhQIhFiaQgMgdAIgPQAEgGAOgJIBNgvQARgLAJABQASABARAeIAyBbQAKASACALQADAMgBATIgJA4IAAAUIAKAQQAVAfABAjQgBAYgKAVQgLAVgTALQgMAGgLAAQgHAAgHgDgAmOIZQgHADgBAEQgBADADAHQAXA3AUApIAeBHQAaA/AmA5QAGAHAEABQAGACAEgDQAKgFAGgNQANgXgHgeQgGgYgTgaQgIgLABgGIAEgMQACgFADgOIADg0IgBgOQgBgIgJgQIg8hrQgnAegrAZgAC6LxQgegKghABIgSABQgKAAgGgCQgEgBgCgBQgEACgGgDQgJgEACgMIAJgSIANgeIASgzQAQgsAFgXQAFgRAMgzQAJgqAJgYIABgCIgDAAIAEgHQAHgKAGgHIACAAIARgLQAUgLATgOIgBgEIAGAAQgCgIAAgJQgCgSAGgQIAIgPIgBAAIAAgBIABgDIABgBIgBAAQAAgFgCgCIgBgCIgBAAIgDgBIgBAAIgNgOQgDgCgHgLQgLgOgEgHQgHgTgFgIIgIgOIAAAEIgJgPIgJgCIgBgDIgBgEQgEgDgEgIQgag9ghhSIgLgcQgIgPgKgRQgMgSgDgJQgEgLABgSQACgxAKgZQABgFAEgDQAEgEAEACQAFABABAKQABAJgDArQgCAfAIATIASAfQAIANALAdIApBuIABAAQAIAOAKAYIAEAMIAIAKIgBABIAIAKQALAPAFAKIAHANIARAbIAIANIAKAIIAAgBIAAAAIAEAEIACAEIAIgIQAVgQAmADQAPAAAIADIAJAEIACACIABABIABAAIgBgHIAAgCQgJgagHghIgFgDIgGgEIADADIAHADIgHghIgVh1IgGgkQgBgJAAgaQABgWgCgOQgHgYgBgMQgFgXAHgPQADgKAHABQAEAAADAKIALAuQAHAnABAZQgBAaABADQAAAHAHAcIAmDRQADAQgEAKQAAADACACIgBABQAPAOAHAMQALATgFAiQgCAXgIAMQgDAGgJAGIAAABIABAEQgMAEgKAHIgHgBIgTAIIgDABIgDABQgRAegUAuQgjBMgPAmQgPAngaBPQgFAOgHADIgFABQgEAAgHgDgADMGYQgJAFgEAEQgDAEgCAIQgPAogHAqIgKA1QgFAUgOAnIglBhQgCADAAADQAzACAuAQQAih9BDiUIAUgrIgHgBIgEAAQgTgFgLgLIgEgCIgBgBQgDgIAAgIQgGgBgEgGIgHAAIgDgEQgTAPgWAMgAE3EWIgVAFQgIADgEAGQgEADgHALIgFAIIgDAJQgDAZAFANQADAHAHAKIACAEIALABIAOAGQAEABAIABIAOABIAOABIAQgEQAVgIAGgLQAEgIABgQIABgIIgBgGQgBgJgDgGQgDgHgSgPIgPgLIgSgEIgPgCIgCAAgAnOIJIAAAAIAAABgAjAH/QgJAAgOgKQgSgMgXgTQgJgHAAgHIAAgBQgBgIALgIIABAAQAMgKAWgPQAIgEAHgFIABgBQAggUAQgNIAqglIBphgQAUgRAMgEIAZgEQAQgGALAAIAAgFQABgMACgFQABgFAMgSQAJgQAHgFQADgFAIgFIASAZIgCABQgIAFgIANQgKAQgCAJQgDAOAHARQAFANANAMQAEAGAJAIQATAOATAEIASACQAKABALgDIAJAQIgCADQgTAMgTANIgHACIgBABIgHADQg3AXg/AdQg2AahkA1IhGAkQgOAGgHAAIgBAAgAAzDwQgTADgFAEQgIADgHAGQgoAihLBHQhHA9g4AgQAKAJAMAKQAJAGAGACQAIABANgGIC5hiQA2gbBdgkQgUgGgSgPQgVgRgPgZQgHgMgBgJQgOAGgNADgAn1FKIAEgHIgEAIgACtgTQgTgEgUgHIgNgGQgGgEgFgKQgFgHAAgGQgBgGADgKQAPgrALgXQADgGAFgEQABgBAHAAIANABIg2hGIgXgEQgTgDgIgGQgHgGgGgUIgEgMQgGgGgDgHQgFgLABgSQgNgrgFgYIgCgIIgHghQgFgXAHgJQADgDAEAAQADAAAEAEQAGAIAEAUQADAQAGAUIAOA1IAEABIAShZIAEgaIgEAAQgWAAgOgKQgKgHgJgPIgCgCIAAgBIAAAAIgEgIIgCACIAAAAQgEgWABgWQACgFACgEIACgDIADgFIACgGQABgHAHgKIAMgOQAOgNAggEQAdgFAQAHQAJAEAJAHQAQAPAGASQADAIABAIQACAMgEAOQgFAVgPAQIgKAJIgRAMIgFABQgBAAgBAAQgBAAAAAAQgBAAAAABQAAAAAAABIgCABIgBgBIAAABIgOAEIgDANQgFAagFA0QgCAPADAIQgBAIACAEIgCAFQAAAFgCAFIADACQAHAJAAAJQABAHgDAIIgBADIACABIAYAaQBQANBOgHQAXgCAFgLQACgDABgLIABgVQAAgHACgEQADgEAEAAIACAAIABAAQAEACABAIQACALgBAOQgBAQgGAIQgLAUgnAFQg2AIhLgHIALAOIAfApIALAOIgBAAQAJACAIAAIAAABIAAACIADgBIAAAEIAJgBQALACgBAIIgCAJQgCAEABAFIACAIIACAMQAAAKACAEIAEAKQACAFgEAGQgGAQgQASQgGAHgFACQgFADgIAAQgGAAgIgCgACeiJQAAAAgBAAQAAABAAAAQgBAAAAABQAAAAgBABQgHAOgIAUIgMAdQgCAGABACIAAAHIAGAHQACADAEABIAXAIQANAFAJABQAEAAAEgBQADgBAEgFIAWgcIACgGQACgDgCgFIgGgPQgDgHgGgWIgFgBIgGABQgFAAgCgCIgBgCIgIgDIgEgEIgGAAIgJgBIgCgBIgCAAgAC4iWIABAAIAAgBIgBABgABMkGIABADIAGADIgEgIIgDACgABFkYQADgBACgGIACgDQACgGAAgEIgFgDIgDAAQgEABgEgCIAHAYgABYngQANgBAMgGQAVgLAIgVQAGgPgDgOQgBgHgEgHIgGgKQgGgHgEgCQgMgIgQAAQgJAAgTAEQgMADgDACQgFADgIAJIgMAPIABAFIAAAAQABAFgCALQgBAUARAUIAHAGQAEADAHABIARACIACgTgAHVg/IhAgKQgUgJgLgCIgRgCQgKgDgCgIQgBgDACgJIALgnQAJgkALgSIAEgGIAEgEQAGgGAMgCIACAAIgBgBIgIgcQgGgSgBgJIgCgLIgHgbQgBgEgCgCQgBgBgGgCQgEgEgCgDIgCgHIgFgDQgCgCgDgHQgDgLAAgFIAAAAQAAgJAFgHIAcgGIAIACIAGAEIAIAJIAFANIADAOQAAALgNANQAHAYACANIAAAMIAKAoIACAFIAAAEIAhgHQAJgCAFADQAFADACAJQAKAnANASQABAEADADIABAGIgBAFIgEAIIgEAOIgEAPIgEAKQgEAHABAFIAAALQAAAGgEADIgFABIgEgBgAGZjHQgIABAAABQgCABgCAEQgJARgFARIgCAKQgGAUgGAPQAAABAAAAQgBAAAAABQAAAAAAABQAAAAABABQAAAAAAABQABAAAAAAQABAAAAABQABAAABAAQAOADAHAEIAdALQATAGAWAAIAQg9QAAgDgEgFQgKgQgMgqgAFxlsIAAADIABABIACAGIAFADIADACIACAAQABAAAAAAQAAAAABABQAAAAAAAAQAAAAABABIAEABQAAAAAAAAQAAgBAAgBQAAAAAAgBQAAgBAAgBIgBgEIgFgJIgEgEQgDgBgEACIgCAAgAgHhnIABgDIgBADIgBAFIgBABIACgGgAE2lVIgBgKIgFgSQgBgEAAgNIAHiIIAAgaQgBgggEgRQgJgrgcgVQgIgGgCgDQgCgDAAgEQAAgDACgCQAFgEAIADQAYAJAPAVQAHAKAGARQAIAVACALQACAKAAAWIAAAOIgCBlIgBAGIACAnIABAJQAAALgCAIIgGAYIgCAKQgCAGgFAAQgFAAgDgHgAAJonIABgBIgBACIAAgBgAAFpDQgGgDAAgIQgBgGAEgIQAMgWAlgdIAQgLQAKgHANgFIAogPIAPgEIACAAIAAgBIAFgOQABgHgBgEIgDgKQgBgGACgEQACgFAFgCQAFgBAEACQAFADADAIQABgFAGABIAJAFQARAPAQAEQAJACASgBQAWgCAIgIQAHgIADgMQANgxgcg6QgEgJAAgFQAAgEACgDQADgDADAAQAEAAAEADQAFAGAEAHQAcAygHA3QgEAjgUAQQgOALgaADQgTABgOgCQgSgFgKgLIgPgVIgBgBQAEATgIARQgDAIgFADQgGAEgGgDIgGADIg3AcQgTALgZAUIgMAMQgGAHgEAHIgHAMQgFAEgFAAIgDAAgADTqFQgXgCgMgVQgFgJAFgDQAEgDAHAGQAMAKAHACQAMAEALgEQAGgDACgEIADgIQAFgFAFAGQAEAEgCAHQgCAGgGAGQgNALgQAAIgEAAgACTruIgFABQgHABgGgBIgMgDQgOgEgGgKQgDgIABgKQACgUAMgJQgFABgEgDQgDgCgDgDIgMgQIgLgTIgEgJIgBgJQgBgKACgKQACgLAFgEQADgEAEgBQAFAAADACQAFACABAIIAAANIgBAHIABAHIADAGQAHAQAHAIQAGAHABADQAEAJgHAHIAAABQAFgCAGAAQAJABAGAGQAEAEAAAHQgBAIgHACQgIAEgBACQAIABAGAEIAEADQAFAAACACQAEACACAEQABAFgBAEQgCAEgGAEIAAAAIgDAHIAAACQgCgEAAgDgADqslQgGgDgBgHQAAgHAGgDIAFgBIABAAQAHAAADAHQACAGgFAFQgDAEgEAAIgFgBgADNtfQgIgBgFgDIgHgDIgHAAQgEAAgCgDQgCgCABgDQACgHAGgCQAGgDAGADIAMAFQAIADASgDQALgCAEgEQAFgDACgGQADgEAAgGQAAgGgGgGQgHgJgQgKQgIgGgHgCIgPgFQgJgEACgIQABgIALgCQAPgCATAJQASAHAJAJQAIAHAIANIAFAJIAAALQgBAKgDAGIgCAFIACABIgIAIQgFAEgKAFIAAgBQgRAKgUAAIgNgBgAByt7IgJgHQgIgGgCgEQgCgDABgEQAAgEADgCQAEgEAGACIAKAFIAKAHQADACACAFQAEAFgBAFQgBAEgCACQgDACgEAAQgEAAgHgFgACVuIIgIgGQgEgDgHgEIgNgFQgGgDAAgFQgCgGAKgEQAFgBAJABQAIACAGADQAHADADAEQAFAFAAAHQAAAFgEAEQgDADgDAAIgDAAgAC8ucIgFgGQgEgFgIgFQgGgEgLgEQgHgCAAgEQAAgEAHgBQAIgBAGAAQAJACALAIQAGAEAFAGQAEAIgDAGQgCAEgDAAIgBAAQgDAAgDgCg");
	this.shape_9.setTransform(268.2313,99.4258);

	this.instance_3 = new lib.CachedBmp_33();
	this.instance_3.setTransform(263,-4.6,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},3).to({state:[{t:this.shape_2,p:{x:72.081,y:95.9758}}]},3).to({state:[{t:this.instance}]},3).to({state:[{t:this.shape_3}]},3).to({state:[{t:this.shape_4}]},3).to({state:[{t:this.shape_5,p:{x:142.4881,y:101.139}}]},3).to({state:[{t:this.instance_1}]},3).to({state:[{t:this.shape_6}]},3).to({state:[{t:this.shape_7}]},3).to({state:[{t:this.shape_2,p:{x:209.581,y:101.0758}}]},3).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.shape_8}]},3).to({state:[{t:this.shape_9}]},3).to({state:[{t:this.shape_5,p:{x:277.4381,y:97.989}}]},3).to({state:[{t:this.instance_3}]},3).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-5.5,354.5,205.8);


(lib.muñecodefrente = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.instance = new lib.CachedBmp_14();
	this.instance.setTransform(0,0,0.3423,0.3423);

	this.instance_1 = new lib.CachedBmp_15();
	this.instance_1.setTransform(5.85,4.55,0.3423,0.3423);

	this.instance_2 = new lib.CachedBmp_16();
	this.instance_2.setTransform(2.4,8.25,0.3423,0.3423);

	this.instance_3 = new lib.CachedBmp_17();
	this.instance_3.setTransform(9.2,11.15,0.3423,0.3423);

	this.instance_4 = new lib.CachedBmp_18();
	this.instance_4.setTransform(16.9,12.7,0.3423,0.3423);

	this.instance_5 = new lib.CachedBmp_19();
	this.instance_5.setTransform(17.15,15.65,0.3423,0.3423);

	this.instance_6 = new lib.CachedBmp_20();
	this.instance_6.setTransform(13.35,19.85,0.3423,0.3423);

	this.instance_7 = new lib.CachedBmp_21();
	this.instance_7.setTransform(21.15,25.3,0.3423,0.3423);

	this.instance_8 = new lib.CachedBmp_22();
	this.instance_8.setTransform(14.25,27.2,0.3423,0.3423);

	this.instance_9 = new lib.CachedBmp_23();
	this.instance_9.setTransform(20.05,31.75,0.3423,0.3423);

	this.instance_10 = new lib.CachedBmp_24();
	this.instance_10.setTransform(16.7,43.2,0.3423,0.3423);

	this.instance_11 = new lib.CachedBmp_25();
	this.instance_11.setTransform(22.15,45.4,0.3423,0.3423);

	this.instance_12 = new lib.CachedBmp_26();
	this.instance_12.setTransform(31.1,46.35,0.3423,0.3423);

	this.instance_13 = new lib.CachedBmp_27();
	this.instance_13.setTransform(26.3,48.65,0.3423,0.3423);

	this.instance_14 = new lib.CachedBmp_28();
	this.instance_14.setTransform(21.8,52.2,0.3423,0.3423);

	this.instance_15 = new lib.CachedBmp_29();
	this.instance_15.setTransform(21.15,56.4,0.3423,0.3423);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},3).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_3}]},3).to({state:[{t:this.instance_4}]},3).to({state:[{t:this.instance_5}]},3).to({state:[{t:this.instance_6}]},3).to({state:[{t:this.instance_7}]},3).to({state:[{t:this.instance_8}]},3).to({state:[{t:this.instance_9}]},3).to({state:[{t:this.instance_10}]},3).to({state:[{t:this.instance_11}]},3).to({state:[{t:this.instance_12}]},3).to({state:[{t:this.instance_13}]},3).to({state:[{t:this.instance_14}]},3).to({state:[{t:this.instance_15}]},3).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,96.8,256.6);


(lib.btvolver = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AiEGTQg6gCgdABQgbABgMgBQgWgBgPgIQgPgJgKgPQgJgPgBgRQAAgSAIgQQAIgQAPgJQAOgKAVgDQAOgCAZAAIBgAAQBQAAAqgGQBCgKAtgdQA6gnAYhAQALgcgCgaQgCgdgRgSQgMgMgTgFQgNgFgWgEQg9gJg6gCIAgAvQAPAWAEAMQAGARgEASQgEASgLAOQgMANgRAGQgRAGgSgEQgbgFgWgaQgNgNgVgkQgSgdgOgRQgUgXgVgMQgHgEgigNQgZgLgMgLQgXgXACggQABgfAagVQAIgGAPgGIAXgMQASgJASgSQALgLATgXIAxg6QASgWAGgLIALgWQAHgOAHgHQAKgMAPgGQAQgGAPACQAPACAOAKQAOAJAIAOQAKASgBAXQAAAVgJAVQgIASgOATIgbAiIgsAzIA/ABQA2ABAnAHQBrARA8A8QAfAeAKAjQAFARAAAZIgBArQgBA1gDARQgJAzgnAxQgfAmg1AoQgnAegfAPQhDAhhlADIgkAAIgzAAg");
	this.shape.setTransform(42.3048,40.3233);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(9.3,0,66.10000000000001,80.7);


(lib.btsiguientealetras = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#0000CC").s().p("ABFFLQgigLgSgbQgSgcABgjQACgkAXgYQAPgPAogWQAlgVAigZQhnAAgjgBQgegBibgMQhygIhJADQguABgPgBQgigCgYgNQgWgMgOgWQgPgVgBgZQgCgZAMgYQALgXAWgOQATgMAbgFQASgDAhAAQBdgCB1AGQBGADCLAKQghgTgRgNQgbgUgMgYQgJgUgBgXQAAgWAJgVQAJgUARgOQARgPAVgGQAhgJApAOQAeALAnAZIBrBIQA/ApAxAUIA0ATQAdAMATAOQAWARAOAYQAJAOAEAPQAMASAEAXQAEAWgHAWQgQAxhKApQgWAMgKAHQgTANgkAhQgiAggWANQgKAGgWAKIggARIguAgQgcAUgWAGQgPAFgPAAQgRAAgSgGg");
	this.shape.setTransform(53.1141,33.712);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,106.3,67.5);


(lib.btnariz = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF9999").s().p("AiDCEIAAkHIEHAAIAAEHg");
	this.shape.setTransform(13.2,13.2);

	this.instance = new lib.CachedBmp_13();
	this.instance.setTransform(173.9,67.75,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_12();
	this.instance_1.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.instance_1},{t:this.instance}]},1).to({state:[{t:this.shape}]},2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,286.9,98.3);


(lib.btceja = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF9999").s().p("AiKBOIAAibIEVAAIAACbg");
	this.shape.setTransform(13.85,7.8);

	this.instance = new lib.CachedBmp_11();
	this.instance.setTransform(-154.55,-33,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_10();
	this.instance_1.setTransform(-113,-1.2,0.5,0.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF9999").s().p("AiKBOIAAg+QARgDAHgFQAIgEADgHQAEgIgDgIQgDgNgTgDQgFgBgJABIAAgqIEVAAIAACbg");
	this.shape_1.setTransform(13.85,7.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.instance_1},{t:this.instance}]},1).to({state:[{t:this.shape_1}]},2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-154.5,-33,182.2,48.8);


(lib.btboca = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#0033CC").s().p("ABnBqQgagEgqAAIhDgBQgVgBgLgFQgSgJgBgRQAAgJAGgIQAGgHAJgEQALgFAaAAIBvABQApAAARALQANAJAEAQQAEARgKAKQgJAJgPAAQgJAAgTgDgAAnAIQhdgCg2gGIhNgMQgugIgfgBIglgBQgVgBgOgHQgWgMACgQQACgLAMgIQAPgJAbgDQAwgFBIAJIB4APQAsAEBGgBQBBgBAogFQA4gGAtgQIAYgIQAOgEALgBQANgBAMAGQAMAHAEALQAEAKgDAMQgDALgIAIQgLALgbALQg5AVhJAGQgmAEg1AAIgsgBg");
	this.shape.setTransform(35.4558,10.8929);

	this.instance = new lib.CachedBmp_9();
	this.instance.setTransform(-176,2.7,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_8();
	this.instance_1.setTransform(-121.15,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.instance_1},{t:this.instance}]},1).to({state:[{t:this.shape}]},2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-176,0,247,38.5);


(lib.Botonplay = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#0000CC").s().p("AjrE9QgTgMgKgOQgQgVgDggQgCgUACgmQAChFgDhWQgCgugHhtQgBgfgEgXIgFgZQgCgOACgLQAEgdAkgiQAcgaATgHQAkgMArATQAYAKAsAiQAoAdBSA4IAXAQQBrBaB3BMIACAJQADASgIAVQgFALgIALIgBAAQgrAWhEApIhSAwIgHAEQgpAVgSAOQiMBThPAoIgJAEQgWgKgLgIg");
	this.shape.setTransform(30.4588,33.552);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,61,67.1);


(lib.boca = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#0033CC").s().p("Ai5A6QgxAAgXgMQgRgJgJgSQgIgTAHgPQAHgRAWgIQAPgGAYgBQBJgFCNgBQCPgCBFgEQAagBAJACQATAEANAQQAMAQgBATQgBARgNAPQgNAPgSAHQgQAGgVACIgmABg");
	this.shape.setTransform(28.8206,6.0583);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#0033CC").s().p("AiNB7QgSgBgPgFQgVgGghgYQgbgTgHgNQgGgNABghIAEhEQAAgMADgHQAHgRAegHQARgEAkgDQC/gPDCACQAYABAJAGQAIAHAGAQQAIAYgCAqQgBAegJANQgFAIgSAOIgkAZQgVAOgZAMQgfAOgZAHQgaAGg+ACIh0AEIgTAAIgPAAgAitgfQgFASAMARQAMARATAHQAQAGAWAAIAogBIAzAAQAeAAAUgCQA8gIAxggQAYgRAKgRQg1gCg0AAQiAAAh/AOg");
	this.shape_1.setTransform(29.9644,10.2511);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#0033CC").s().p("AguDuQgxgDgxgIQgqgGgZgLQgegMgogfQgtgigSgeQgSgdgLgzQgQhEABgyQABg2AZgaQAQgQAcgHQATgFAggBIBogBQA9AAAqgGIBbgOQAigEBDgDIBbgFQA7gCAaAEQAZADAOALQARAOAJAgQAXBLgKBMQgFAkgLAbQgTAwgoAmQghAfg1AbQgZANgfAMQgfALgYAGQg5AOhFAAIgigBgAkpiHIADAoQAAAaACANQACAWALAqQAHAbAHANQAKAUAWARQAOAMAcAQQATAMAJACQAOAEAbAAQAJACAOAFIAXAHQAVAGAogBIA7gBQAhgCAZgGQAggHAjgQQAugVAcgXQATgPAMgRQAdgkAHgvQAIgvgQgsQgGgRgJgFIgEgCIAAACQACAngJAVQgGANgRAUQgOASgNAJQgPALgbAIQgyAPgmAEQgMABgrABIgtABQg5ABgdgCQgwgCglgJQgmgKghgTQgTgLgFgLQgDgGAAgOQAAgbADgcIABgFIgcABgAjNh7IAAAbQAzATAYAEQAaAFA3AAIAtAAQAxAAAagCQAqgCAggJQA5gPAJgjQABgGAAgSIhQADQg+AEgQACIhFAIQgyAFhbgCIgzgBIACANg");
	this.shape_2.setTransform(28.9758,13.3048);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#0033CC").s().p("AkjCRQgcgHgRgHQgYgKgQgNQgRgOgVgcQgRgXgGgMQgOgcADggQACgfAOgeQAVgqAlgYQArgbBWgEQBXgECYAGQCqAHBEgBQBEgBAeAFQA4AMAbAkQAKAOAIAVQAEANAGAZQAGAXABAMQADATgDAPQgGAbgaAdQhLBRicAaQhLAMhQAAQiXAAiqgtgAlBhbQgaAKgRAVQgTAWAAAaQASAAAVARIAPAQQAKAKAHAEQAPALAeAIQA/ARBIAPQBEAPArACQAhABBGgGQBDgGAkgHQA4gLApgUQAigQAUgVQAQgRABgPQACgMgJgWQgIgRgHgGQgJgIgYgCIgYAAQABAggJAVQgMAdghAXQgeAYggAKQgTAGgZACQgPACgfAAQhQACgxgDQhWgEgwgfQgUgNgSgSQgYgYgGgUQgIgYAIghQgmACgVAIgAjAhUQAGANASANQAWAQAYAIQAUAGArACICSAHQAwACAWgJQANgGAMgJQANgIAEgJQAEgGAAgLIAAgJQhPgBh8gHIjGgJQACALAEAGg");
	this.shape_3.setTransform(30.7123,13.3487);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#0033CC").s().p("ABnBqQgagEgqAAIhDgBQgVgBgLgFQgSgJgBgRQAAgJAGgIQAGgHAJgEQALgFAaAAIBvABQApAAARALQANAJAEAQQAEARgKAKQgJAJgPAAQgJAAgTgDgAAnAIQhdgCg2gGIhNgMQgugIgfgBIglgBQgVgBgOgHQgWgMACgQQACgLAMgIQAPgJAbgDQAwgFBIAJIB4APQAsAEBGgBQBBgBAogFQA4gGAtgQIAYgIQAOgEALgBQANgBAMAGQAMAHAEALQAEAKgDAMQgDALgIAIQgLALgbALQg5AVhJAGQgmAEg1AAIgsgBg");
	this.shape_4.setTransform(30.5058,6.6429);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#0033CC").s().p("AgmCYQgOgMACgaQACgiAXgdIgqAAIggACQgLAAgJgBIgIAIQgPAQgEAVIgGAfQgFASgPAEQgOADgLgMQgIgJgBgQQgBgbAcglIAMgOIgWgOQgTgMgQgNQgJAJgXACIg4ADQgdABgPgGQgagJgKgdQgKgdAOgXQAOgZAjgLQAUgGAqgCIGHgRQA2gCAmgEIAvgFQAbgDAUABQA3ABAYAdQAPATADAqQABAbgHAPQgIAQgYANQg+AkhWgKQgTgDgIgGQgHgEgDgHIAAgBQgWARgcAKQgTAHgZAEQgFALgMAHIgZALQgYAMgGAbIgDAOQgCAJgDAFQgFAKgMACIgGAAQgJAAgGgFgAjTgyQAIALAPAIQAKAGAUAIQAZAKANADQARADAiABQBWAAAkgCQAmgDAXgMQANgGATgRIAKgIQg1ADhrgDQhagChUAAIghAAgADXg3QABAGAAAHQgBAKgJANIA0gGQAkgEATgOQAJgGAEgKQAFgKgEgJQg/APgxAIgAlGgwQAJAOAXACIAlgCQgFgIgBgGIAAgBIg/ABg");
	this.shape_5.setTransform(30.3225,7.6681);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#0033CC").s().p("AgkCTQgPgBgKgEIgcgQQgUgKgJgHQgngcgDhFQAAgaAHgMIAHgOIABgQQAAgLAQgVQASgWALgJQAigbBFAAQAPgBANADIAcAKIAhAMQAUAJAQAQQAWAYAHAfQADAOABAbQAAAfgGARQgEAOgMARQgNASgMALQgjAjgtAFIgsAAIgaAAgAgTg4QgkABgRAYQADAIAAAPQAAARABAGQAFAVATAKQAJAFARACQAcADAVgIQAagLAIgYQAFgMgDgMQgDgNgKgIQgEgEgLgFQghgPgYAAIgBAAg");
	this.shape_6.setTransform(27.275,6.9875);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#0033CC").s().p("AgNCzQg3gCgigIQgbgGgrgRQglgOgXgNQgfgRgUgXQglgrgCg/QgCgeAIgeQAKgpAYgTQASgNAmgHQBRgOB+AEQC5AFAXAAQAdgBANACQAXADAQAKQAQALAPAaQARAeAEAdQAKBEg3BJQgXAfgZASQggAXgwALQg/ARhWAAIgNAAgADGgiQgXAPgtAIIgiAFQASAcAFA4IABAOIAGgBQAxgMAYgVQATgQAXgnIAKgTQAFgMgBgLQAAgJgFgMIgLgUIgBgDQgMAfgcASgAjyhqQgEAEgCAJQgGAaAAANQgBARAGAUQADALAKAXQAFAOAEAFQAHAIAPAJQAoAXAtANIgBgEQgIgbADgSQADgRATgZQgPgBgMgEIgVgIIgLgGQgggPgOgPQgMgNgEgRQgDgOACgMIgDgBIgEAAQgGAAgDACgAithpQAGAKAPALQAVAMAXAFQAPADAfABQBUACAmgEQAcgDAngIQAlgGAKgSQhOABiSgDIhYgCIgjgBg");
	this.shape_7.setTransform(24.865,10.1708);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).to({state:[]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-14.2,-10.5,89.9,47.7);


// stage content:
(lib.cicloandarnuevopircin = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {M:115,Uh:116,S:118,Ah:122,"M":125,"M":126,"S":133,"Ah":135,Neutral:138,"Neutral":140,"M":143,"Neutral":145,"Uh":147,"Uh":151,"S":177,"Ah":179,Ee:185,L:187,"Neutral":192,"Uh":195,"Ah":199,D:202,"Neutral":203,"Neutral":212};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,115,212,213,260,317];
	this.streamSoundSymbolsList[115] = [{id:"KurtRussellisfuckingcultDeathProof20072mp3copia",startFrame:115,endFrame:213,loop:1,offset:1960}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
	}
	this.frame_115 = function() {
		var soundInstance = playSound("KurtRussellisfuckingcultDeathProof20072mp3copia",0,1960);
		this.InsertIntoSoundStreamData(soundInstance,115,213,1,1960);
		/* Detener en este fotograma
		La línea de tiempo se detendrá/pausará en el fotograma en el que se inserte este código.
		También se puede utilizar para detener/pausar la línea de tiempo de clips de película.
		*/
		
		this.stop(116);
		/* Hacer clic para ir al fotograma y reproducir
		Al hacer clic en la instancia del símbolo especificado, la cabeza lectora se mueve hasta el fotograma especificado en la línea de tiempo y prosigue la reproducción desde dicho fotograma.
		Se puede utilizar en la línea de tiempo principal o en líneas de tiempo de clips de película.
		
		Instrucciones:
		1. Reemplace el número 5 del siguiente código por el número de fotograma hasta el que quiere que se mueva la cabeza lectora cuando se haga clic en la instancia del símbolo.
		2.Los números de fotograma en EaselJS empiezan con 0 en vez de 1
		*/
		
		this.button_10.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_5.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_5()
		{
			this.gotoAndPlay(117);
		}
	}
	this.frame_212 = function() {
		/* Detener en este fotograma
		La línea de tiempo se detendrá/pausará en el fotograma en el que se inserte este código.
		También se puede utilizar para detener/pausar la línea de tiempo de clips de película.
		*/
		
		this.stop(213);
		
		/* Hacer clic para ir al fotograma y reproducir
		Al hacer clic en la instancia del símbolo especificado, la cabeza lectora se mueve hasta el fotograma especificado en la línea de tiempo y prosigue la reproducción desde dicho fotograma.
		Se puede utilizar en la línea de tiempo principal o en líneas de tiempo de clips de película.
		
		Instrucciones:
		1. Reemplace el número 5 del siguiente código por el número de fotograma hasta el que quiere que se mueva la cabeza lectora cuando se haga clic en la instancia del símbolo.
		2.Los números de fotograma en EaselJS empiezan con 0 en vez de 1
		*/
		
		this.button_3.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_6.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_6()
		{
			this.gotoAndPlay(214);
		}
	}
	this.frame_213 = function() {
		/* Hacer clic para colocar un objeto
		Mueve la instancia del símbolo especificado a la coordenada x e y que especifique.
		
		Instrucciones:
		1. Reemplace el valor 200 por la coordenada x
		      donde quiera colocar el objeto.
		2. Reemplace el valor 100 por la coordenada y donde quiera colocar el objeto.
		*/
		
		this.pircing_oreja_derec.addEventListener("click", fl_ClickToPosition_19.bind(this));
		
		function fl_ClickToPosition_19()
		{
			this.pircing_oreja_derec.x = 415,5;
			this.pircing_oreja_derec.y = 272,45;
		}
		
		
		/* Hacer clic para colocar un objeto
		Mueve la instancia del símbolo especificado a la coordenada x e y que especifique.
		
		Instrucciones:
		1. Reemplace el valor 200 por la coordenada x
		      donde quiera colocar el objeto.
		2. Reemplace el valor 100 por la coordenada y donde quiera colocar el objeto.
		*/
		
		this.pircing_oreja_izq.addEventListener("click", fl_ClickToPosition_20.bind(this));
		
		function fl_ClickToPosition_20()
		{
			this.pircing_oreja_izq.x = 213,05;
			this.pircing_oreja_izq.y = 259;
		}
		
		
		/* Hacer clic para colocar un objeto
		Mueve la instancia del símbolo especificado a la coordenada x e y que especifique.
		
		Instrucciones:
		1. Reemplace el valor 200 por la coordenada x
		      donde quiera colocar el objeto.
		2. Reemplace el valor 100 por la coordenada y donde quiera colocar el objeto.
		*/
		
		this.pircing_ceja.addEventListener("click", fl_ClickToPosition_21.bind(this));
		
		function fl_ClickToPosition_21()
		{
			this.pircing_ceja.x = 277,8;
			this.pircing_ceja.y = 214,65;
		}
		
		
		/* Hacer clic para colocar un objeto
		Mueve la instancia del símbolo especificado a la coordenada x e y que especifique.
		
		Instrucciones:
		1. Reemplace el valor 200 por la coordenada x
		      donde quiera colocar el objeto.
		2. Reemplace el valor 100 por la coordenada y donde quiera colocar el objeto.
		*/
		
		this.pircing_nariz.addEventListener("click", fl_ClickToPosition_22.bind(this));
		
		function fl_ClickToPosition_22()
		{
			this.pircing_nariz.x = 320;
			this.pircing_nariz.y = 263,45;
		}
		
		
		/* Hacer clic para colocar un objeto
		Mueve la instancia del símbolo especificado a la coordenada x e y que especifique.
		
		Instrucciones:
		1. Reemplace el valor 200 por la coordenada x
		      donde quiera colocar el objeto.
		2. Reemplace el valor 100 por la coordenada y donde quiera colocar el objeto.
		*/
		
		this.pircing_boca.addEventListener("click", fl_ClickToPosition_23.bind(this));
		
		function fl_ClickToPosition_23()
		{
			this.pircing_boca.x = 342,9;
			this.pircing_boca.y = 283,65;
		}
	}
	this.frame_260 = function() {
		/* Detener en este fotograma
		La línea de tiempo se detendrá/pausará en el fotograma en el que se inserte este código.
		También se puede utilizar para detener/pausar la línea de tiempo de clips de película.
		*/
		
		this.stop(261);
		
		/* Hacer clic para ir al fotograma y reproducir
		Al hacer clic en la instancia del símbolo especificado, la cabeza lectora se mueve hasta el fotograma especificado en la línea de tiempo y prosigue la reproducción desde dicho fotograma.
		Se puede utilizar en la línea de tiempo principal o en líneas de tiempo de clips de película.
		
		Instrucciones:
		1. Reemplace el número 5 del siguiente código por el número de fotograma hasta el que quiere que se mueva la cabeza lectora cuando se haga clic en la instancia del símbolo.
		2.Los números de fotograma en EaselJS empiezan con 0 en vez de 1
		*/
		
		this.button_8.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_7.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_7()
		{
			this.gotoAndPlay(262);
		}
	}
	this.frame_317 = function() {
		/* Detener en este fotograma
		La línea de tiempo se detendrá/pausará en el fotograma en el que se inserte este código.
		También se puede utilizar para detener/pausar la línea de tiempo de clips de película.
		*/
		
		this.stop(318);
		
		/* Hacer clic para ir al fotograma y reproducir
		Al hacer clic en la instancia del símbolo especificado, la cabeza lectora se mueve hasta el fotograma especificado en la línea de tiempo y prosigue la reproducción desde dicho fotograma.
		Se puede utilizar en la línea de tiempo principal o en líneas de tiempo de clips de película.
		
		Instrucciones:
		1. Reemplace el número 5 del siguiente código por el número de fotograma hasta el que quiere que se mueva la cabeza lectora cuando se haga clic en la instancia del símbolo.
		2.Los números de fotograma en EaselJS empiezan con 0 en vez de 1
		*/
		
		this.button_9.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_8.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_8()
		{
			this.gotoAndPlay(1);
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(115).call(this.frame_115).wait(97).call(this.frame_212).wait(1).call(this.frame_213).wait(47).call(this.frame_260).wait(57).call(this.frame_317).wait(1));

	// texto
	this.instance = new lib.CachedBmp_2();
	this.instance.setTransform(490.4,53.4,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_1();
	this.instance_1.setTransform(40.75,26,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_3();
	this.instance_2.setTransform(41.1,25.9,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_1},{t:this.instance}]},213).to({state:[{t:this.instance_2}]},48).wait(57));

	// Pircing_oreja_derec
	this.pircing_oreja_derec = new lib.pircing_oreja_dere();
	this.pircing_oreja_derec.name = "pircing_oreja_derec";
	this.pircing_oreja_derec.setTransform(546.2,127.75,1,1,0,0,0,13.1,18.1);
	this.pircing_oreja_derec._off = true;
	new cjs.ButtonHelper(this.pircing_oreja_derec, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.pircing_oreja_derec).wait(213).to({_off:false},0).wait(105));

	// pircing_oreja_izq
	this.pircing_oreja_izq = new lib.pircing_oreja_izq();
	this.pircing_oreja_izq.name = "pircing_oreja_izq";
	this.pircing_oreja_izq.setTransform(545.5,193.2,1,1,0,0,0,17.9,17.1);
	this.pircing_oreja_izq._off = true;
	new cjs.ButtonHelper(this.pircing_oreja_izq, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.pircing_oreja_izq).wait(213).to({_off:false},0).wait(105));

	// pircing_ceja
	this.pircing_ceja = new lib.pircing_ceja();
	this.pircing_ceja.name = "pircing_ceja";
	this.pircing_ceja.setTransform(550,252.45,1,1,0,0,0,9.3,11.6);
	this.pircing_ceja._off = true;
	new cjs.ButtonHelper(this.pircing_ceja, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.pircing_ceja).wait(213).to({_off:false},0).wait(105));

	// pircing_nariz
	this.pircing_nariz = new lib.pircing_nariz();
	this.pircing_nariz.name = "pircing_nariz";
	this.pircing_nariz.setTransform(550,306.25,1,1,0,0,0,9.3,7.2);
	this.pircing_nariz._off = true;
	new cjs.ButtonHelper(this.pircing_nariz, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.pircing_nariz).wait(213).to({_off:false},0).wait(105));

	// pircing_boca
	this.pircing_boca = new lib.pircing_boca();
	this.pircing_boca.name = "pircing_boca";
	this.pircing_boca.setTransform(551.2,350.55,1,1,0,0,0,8.1,8.8);
	this.pircing_boca._off = true;
	new cjs.ButtonHelper(this.pircing_boca, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.pircing_boca).wait(213).to({_off:false},0).wait(105));

	// guias_pircing
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFF33").s().p("AEQF6QgSgHgCgVQgDgPAKgMQAKgMAQABQAEAAgCgCQANACAJAHQAJAHACAMQACALgEALQgGAMgOAGQgGACgHAAQgGAAgHgCgAPmEKQgSgIgCgTQgDgQAKgMQAKgNAQABQAEAAgCgCQANADAJAHQAJAHACAMQACAMgEAKQgGANgOAFQgGADgHAAQgGAAgHgDgAArCwQgSgIgCgTQgDgQAKgMQAKgNAQABQAEAAgCgCQANADAJAHQAJAHACAMQACAMgEAKQgGANgOAFQgGADgHAAQgGAAgHgDgAwBCEQgSgIgDgUQgCgPAJgMQALgNAPABQAEAAgCgCQAOADAJAGQAIAIADALQACAMgFALQgGAMgNAGQgHACgGAAQgHAAgGgCgAl6k3QgSgHgCgUQgDgQAKgMQAKgNAQABQAEAAgCgCQANADAJAHQAJAHACAMQACAMgEAKQgGANgOAFQgGACgHAAQgGAAgHgCg");
	this.shape.setTransform(317.7547,252.7);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(213).to({_off:false},0).wait(105));

	// boton_siguiente
	this.button_10 = new lib.Botonplay();
	this.button_10.name = "button_10";
	this.button_10.setTransform(549.65,234.95,1,1,0,0,0,30.4,33.5);
	new cjs.ButtonHelper(this.button_10, 0, 1, 1);

	this.button_3 = new lib.siguientebt();
	this.button_3.name = "button_3";
	this.button_3.setTransform(540.1,90.7,1,1,0,0,0,53.1,33.7);
	new cjs.ButtonHelper(this.button_3, 0, 1, 1);

	this.button_8 = new lib.btsiguientealetras();
	this.button_8.name = "button_8";
	this.button_8.setTransform(119.55,340.3,1,1,0,0,0,53.1,33.7);
	new cjs.ButtonHelper(this.button_8, 0, 1, 1);

	this.button_9 = new lib.btvolver();
	this.button_9.name = "button_9";
	this.button_9.setTransform(567.9,320.1,1,1,0,0,0,53.1,53.9);
	new cjs.ButtonHelper(this.button_9, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.button_10}]},115).to({state:[]},1).to({state:[{t:this.button_3}]},96).to({state:[]},1).to({state:[{t:this.button_8}]},47).to({state:[]},1).to({state:[{t:this.button_9}]},56).wait(1));

	// boca
	this.instance_3 = new lib.boca("single",5);
	this.instance_3.setTransform(322.3,283.25,1,1,0,0,0,28.8,6);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(115).to({_off:false},0).wait(1).to({startPosition:3},0).wait(2).to({startPosition:9},0).wait(4).to({startPosition:3},0).wait(3).to({startPosition:5},0).wait(1).to({startPosition:5},0).wait(7).to({startPosition:9},0).wait(2).to({startPosition:3},0).wait(3).to({startPosition:1},0).wait(2).to({startPosition:9},0).wait(3).to({startPosition:5},0).wait(2).to({startPosition:9},0).wait(2).to({startPosition:1},0).wait(4).to({startPosition:0},0).wait(26).to({startPosition:9},0).wait(2).to({startPosition:3},0).wait(6).to({startPosition:1},0).wait(2).to({startPosition:4},0).wait(5).to({startPosition:6},0).wait(3).to({startPosition:8},0).wait(4).to({startPosition:3},0).wait(3).to({startPosition:5},0).wait(1).to({startPosition:0},0).wait(9).to({startPosition:0},0).to({_off:true},1).wait(105));

	// cara_
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#0000CC").s().p("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");
	this.shape_1.setTransform(334.375,293.7029);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#0033CC").s().p("ABnBqQgagEgqAAIhDgBQgVgBgLgFQgSgJgBgRQAAgJAGgIQAGgHAJgEQALgFAaAAIBvABQApAAARALQANAJAEAQQAEARgKAKQgJAJgPAAQgJAAgTgDgAAnAIQhdgCg2gGIhNgMQgugIgfgBIglgBQgVgBgOgHQgWgMACgQQACgLAMgIQAPgJAbgDQAwgFBIAJIB4APQAsAEBGgBQBBgBAogFQA4gGAtgQIAYgIQAOgEALgBQANgBAMAGQAMAHAEALQAEAKgDAMQgDALgIAIQgLALgbALQg5AVhJAGQgmAEg1AAIgsgBg");
	this.shape_2.setTransform(322.4058,288.1429);

	this.instance_4 = new lib.btceja();
	this.instance_4.setTransform(288.35,218.4,1,1,0,0,0,13.8,7.8);
	new cjs.ButtonHelper(this.instance_4, 0, 1, 2, false, new lib.btceja(), 3);

	this.instance_5 = new lib.btnariz();
	this.instance_5.setTransform(321.9,265.15,1,1,0,0,0,13.2,13.2);
	new cjs.ButtonHelper(this.instance_5, 0, 1, 2, false, new lib.btnariz(), 3);

	this.instance_6 = new lib.btboca();
	this.instance_6.setTransform(322.45,288.15,1,1,0,0,0,35.5,10.9);
	new cjs.ButtonHelper(this.instance_6, 0, 1, 2, false, new lib.btboca(), 3);

	this.instance_7 = new lib.Símbolo2();
	this.instance_7.setTransform(316.1,252.8,1,1,0,0,0,126,35.2);
	new cjs.ButtonHelper(this.instance_7, 0, 1, 2, false, new lib.Símbolo2(), 3);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#0000CC").s().p("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");
	this.shape_3.setTransform(334.375,293.7029);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1}]},115).to({state:[{t:this.shape_1},{t:this.shape_2}]},98).to({state:[{t:this.shape_3},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4}]},48).wait(57));

	// muñeco_de_frentw
	this.instance_8 = new lib.CachedBmp_4();
	this.instance_8.setTransform(217.2,147.4,0.5,0.5);

	this.instance_9 = new lib.muñecodefrente("synched",0);
	this.instance_9.setTransform(253.45,248.2,1,1,0,0,0,32.9,99.5);
	this.instance_9._off = true;

	this.instance_10 = new lib.CachedBmp_5();
	this.instance_10.setTransform(238.25,173.25,0.5,0.5);

	this.instance_11 = new lib.CachedBmp_6();
	this.instance_11.setTransform(245.3,172.4,0.5,0.5);

	this.instance_12 = new lib.CachedBmp_7();
	this.instance_12.setTransform(237.35,172.55,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_8}]},48).to({state:[{t:this.instance_9}]},5).to({state:[{t:this.instance_9}]},47).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_11}]},3).to({state:[{t:this.instance_12}]},4).to({state:[]},7).wait(203));
	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(53).to({_off:false},0).to({regX:33,regY:99.7,scaleX:1.4609,scaleY:1.4609,x:261.45,y:233.35,startPosition:47},47).to({_off:true,regX:0,regY:0,scaleX:0.5,scaleY:0.5,x:238.25,y:173.25},1).wait(217));

	// muñeco_entra
	this.instance_13 = new lib.muñecodelado("synched",0);
	this.instance_13.setTransform(-20.35,248.9,1,1,0,0,0,51.6,97.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).to({x:-0.3,startPosition:47},47).to({_off:true},1).wait(270));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(248.1,265.9,359.29999999999995,214.10000000000002);
// library properties:
lib.properties = {
	id: '17DEA048F44AD64B8DC80DE1FB00CD1A',
	width: 640,
	height: 480,
	fps: 24,
	color: "#FF9999",
	opacity: 1.00,
	manifest: [
		{src:"images/ciclo andar  nuevo pircin 5_01_23_atlas_1.png", id:"ciclo andar  nuevo pircin 5_01_23_atlas_1"},
		{src:"sounds/KurtRussellisfuckingcultDeathProof20072mp3copia.mp3", id:"KurtRussellisfuckingcultDeathProof20072mp3copia"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['17DEA048F44AD64B8DC80DE1FB00CD1A'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;