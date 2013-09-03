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


	this.mid={ x: undefined, y: undefined };
	this.hitbox=32; // Defined as a radius or an XY struct

	this.pause=false;
	this.hide=false;



	/*
			Private vars
	*/
	this._pos={ x: 0, y: 0 };
	this._vel={ x: 0, y: 0, max: 5 };
	this._accel={ x: 0, y: 0, max: 3, damp: 1 };
	this._angle={ a: 0, i: 0 };
	this._omega={ o: 0, max: Math.PI/16 };
	this._alpha={ a: 0, max: Math.PI/32, damp: 1 };

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


	// Draw all textures
	this.draw=function(ctx) { for(i=0; i<this.textures.length; ++i) this.textures[i].draw(ctx, this._pos); }

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
	this.move=function(pos) {
		if(typeof pos!='object') throw (this.id+': face(pos) pos must take an XY struct'); // DEBUG
		if(typeof pos.x!='number') throw (this.id+': face(pos) parameter "pos.x" must be a number; got a typeof('+pos.x+')=='+typeof pos.x); // DEBUG
		if(typeof pos.y!='number') throw (this.id+': face(pos) parameter "pos.y" must be a number; got a typeof('+pos.y+')=='+typeof pos.y); // DEBUG
		// DEBUG
		// Offsets
		var cx, cy, moved, vel=1;
		cx=(pos.x-this._pos.x);
		cy=(pos.y-this._pos.y);
		moved=(cx!=0||cy!=0);


		// OLD MOVEMENT CONTROL
		if(moved) {
			if(this.idle) this.step(); // If animated only on movement

			// Gonna have to do some math to make diagonal movement smooth
			if(cx==0) {
				this._vel.x=0;
			} else {
				this._vel.x=(cx<0?-1:1)*vel*Math.cos(Math.atan(cy/cx));
				if(Math.abs(cx)<Math.abs(this._vel.x)) this._pos.x=pos.x;
				else this._pos.x+=this._vel.x;
			}
			if(cy==0) {
				this._vel.y=0;
			} else {
				this._vel.y=(cy<0?-1:1)*Math.sqrt(vel*vel-this._vel.x*this._vel.x);
				if(Math.abs(cy)<Math.abs(this._vel.y)) this._pos.y=pos.y;
				else this._pos.y+=this._vel.y;
			}
		}
		//

		return !moved; // Return true if destination reached
	}


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

	// Animate a turn towards a direction
	this.turn=function(pos) { // 1 overload
		if(typeof pos!='object') throw (this.id+': turn(pos) pos must take an XY struct'); // DEBUG
		if(typeof pos.x!='number') throw (this.id+': turn(pos) parameter "pos.x" must be a number; got a typeof('+pos.x+')=='+typeof pos.x); // DEBUG
		if(typeof pos.y!='number') throw (this.id+': turn(pos) parameter "pos.y" must be a number; got a typeof('+pos.y+')=='+typeof pos.y); // DEBUG
		// DEBUG
		var destAng=0, finalDest=0;

		if(typeof pos=='number') { // turn(angle)
			destAng=x;
		} else { // turn(x, y)
			pos.x-=this._pos.x;
			pos.y-=this._pos.y;

			if(pos.x!=0||pos.y!=0) {
				if(pos.y==0) {
					destAng=Math.PI/2;
					if(pos.x<0) destAng+=Math.PI;
				} else {
					destAng=Math.atan(x/y);
					if(y<0) destAng+=Math.PI;
				}
				destAng+=Math.PI*3/2; // Prevents negative values
				destAng%=Math.PI*2;
			}
		}

		finalDest=destAng;

		/*
			Above is the normal stuff.
			Here is where it gets super complicated.
		*/
		var diff=destAng-this._angle; // Get the difference in angle
		if(Math.abs(diff.toFixed(8))!=0) {
			if(diff<0) diff+=Math.PI*2;

			if(destAng<this._angle) destAng+=Math.PI*2; // Adjust to get a difference [related to unit circle]
			if(Math.PI<diff) diff-=Math.PI*2; // Adjust to make it from -π to π

			if(Math.abs(diff)<=this.angVel) this._angle=destAng; // Snap to destination
			else this._angle+=diff<0?-this.angVel:this.angVel; // Turn towards the destination

			this._angle=(this._angle+Math.PI*2)%(Math.PI*2);
			this._alt=this._getAngleIndex(this._angle);

		}

		// Return false if not facing the target
		return (this._angle.toFixed(8)==finalDest.toFixed(8));
	}



	// Constructor
	this.Ent(id);
};