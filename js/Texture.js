//		Texture Object


var g_fpsEngine=60; // FPS that the processing engine is set to [it affects the texture FPS]
var g_fpsTexture=60; // Global FPS that all textures default to

var Texture=function(id) {
	/*
			Public vars
	*/
	this.id='';
	this.img=null;

	this.size={ x: 0, y: 0 }; // Size of image
	this.mid={ x: 0, y: 0 }; // Mid point of the texture to center on when drawn

	// Tile size [default: size of image]
	// Setting it will allow for animated textures
	this.tileSize={ x: 0, y: 0 };

	//	Some nice features to have for animation:
	this.pause=false;
	this.hide=false;
	this.loop=true;
	this.reverse=false;



	/*
			Private vars
	*/
	this._fps=g_FPS;         // < FPS of the animation
	this._fpsFlat=1000/g_FPS;// < Flattened is already divided with 1000
	this._frame=0;           // < Current frame of an animation
	this._frameCount=0;      // < Number of frames in an animation
	this._frameTime=0;       // < Current time on a frame
	this._alt=0;             // < Alternate views [different angles]
	this._altCount=0;        // < Count of alt views
	this._angle=0;           // < Current angle

	this._lastSheetPos={ u: 0, v: 0 };

	this._stepped=0; // DEBUG: Help coders catch unecessary calls to step() before a draw()



	/*
			Public methods
	*/
	// Set/Get FPS
	this.getFPS=function() { return this._fps; }
	this.setFPS=function(fps) {
		if(typeof fps!='number') throw (this.id+': setFPS(fps) parameter "fps" must be a number; got a typeof('+fps+')=='+typeof fps); // DEBUG
		var fpsMin=8;
		this._fps=fps;
		if(this._fps<fpsMin) this._fps=fpsMin;
		this._fpsFlat=1000/this._fps;
	}

	/*
			Private methods
	*/


};