/*
			Entity Class

	The Entity class handles handles objects that might be
		considered physical objects.

	There can be multiple textures on the entity.  This allows
		for layering textures.
*/

var g_pxm=32; // Global definition of a meter

var Ent=function(id) {
	/*
		Public vars
	*/
	this.id='';
	this.textures=new Array();

	this.pos={ x: 0, y: 0 };
	this.mid={ x: undefined, y: undefined };
	this.hitbox=32; // Defined as a radius or an XY struct

	this.pause=false;
	this.hide=false;



	/*
			Private vars
	*/
	this._vel=0;
	this._accel=0;

	this._pxm=g_pxm;           // px/m [pixels per meter]
	this._pxmFlat=1/this._pxm; //    the entity moves at

	this._frame=0;           // < Current frame of an animation
	this._frameCount=0;      // < Number of frames in an animation
	this._frameTime=0;       // < Current time on a frame

	this._stepped=0; // DEBUG: Help coders catch unecessary calls to step() before a draw()



	/*
			Public methods
	*/
	this.Ent=function(id, textures) {
		this.id=id;
		console.log(textures)
		if(textures!=undefined) {
			this.textures=textures;
		}
	}

	// Each call makes the entity move closer to a desired state, like
	//		walking to a destination, facing a direction, 
	this.step=function() {
		// angle smoothing

		// check to turn 1st or move at the same time

		// movement smoothing

		for(i=0; i<this.textures.length; ++i) this.textures[i].step();
	}

	// Texture management
	this.addTexture=function(id, tileSize) { // 1 overload
		if(id==undefined) {
			console.log('addTexture() :: No ID given, not adding texture'); // DEBUG
			return;
		}

		this.textures.push(new Texture(id, tileSize));
	}
	this.delTexture=function(i) { if(0<i&&i<this.textures.length) this.textures.splice(i, 1); }



	// Constructor
	this.Ent(id);
};