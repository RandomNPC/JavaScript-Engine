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
	this.vel={ x: 0, y: 0, max: 5 };
	this.accel={ x: 0, y: 0, max: 3, damp: 1 };

	this.mid={ x: undefined, y: undefined };
	this.hitbox=32; // Defined as a radius or an XY struct

	this.pause=false;
	this.hide=false;



	/*
			Private vars
	*/
	this._angle=0;

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


	// Drawing all textures, if not specified
	//		draw(ctx)        = Draw all textures
	//		draw(ctx, index) = Draws texture at some index
	//		draw(ctx, id)    = Draw all textures of this id
	this.draw=function(ctx, i) {
		if(i==undefined) {
			for(i=0; i<this.textures.length; ++i) this.textures[i].draw(ctx, this.pos);
		} else if(typeof i=='number') {
			this.textures[i].draw(ctx, this.pos);
		} else if(typeof i=='string') {
			//		TODO
			//	Eventually make a mapping function
			//	to avoid linear performance hits
			var name=i;
			for(i=0; i<this.textures.length; ++i) if(this.textures[i].id==name) this.textures[i].draw(ctx, this.pos);
		} else { // DEBUG
			throw (this.id+': draw(ctx, i) parameter "i" must be undefined [defaulted], a number, or string; got a typeof('+i+')=='+typeof i); // DEBUG
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


	// Movement

	// Angles
	this.face=function(pos) {
		// DEBUG: Check position
		if(typeof pos=='number') { // DEBUG
			if(typeof pos!='number') throw (this.id+': face(angle) parameter "angle" must be a number; got a typeof('+pos+')=='+typeof pos); // DEBUG
		} else { // DEBUG
			if(typeof pos!='object') throw (this.id+': face(pos) pos must take an XY struct'); // DEBUG
			if(typeof pos.x!='number') throw (this.id+': face(pos) parameter "pos.x" must be a number; got a typeof('+pos.x+')=='+typeof pos.x); // DEBUG
			if(typeof pos.y!='number') throw (this.id+': face(pos) parameter "pos.y" must be a number; got a typeof('+pos.y+')=='+typeof pos.y); // DEBUG
		} // DEBUG
		// DEBUG
		if(typeof pos=='number') { // face(angle)
			this._angle=pos;
			for(i=0; i<this.textures.length; ++i) this.textures[i].face(this._angle);
		} else { // face(x, y)
			if(0<this.textures.length) this._angle=this.textures[i].face(pos);
			for(i=1; i<this.textures.length; ++i) this.textures[i].face(pos);
		}
		return this._angle;
	}

	// Constructor
	this.Ent(id);
};