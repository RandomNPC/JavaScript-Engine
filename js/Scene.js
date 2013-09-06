/*
			Scene Class

	Organizes what you see into scenes. You can add more to
		an instance of the class & swap between them.
*/


var Scene=function(id) {
	/*
		Public vars
	*/
	this.id='';


	// 2 ways to access entities
	this._entArr=[];
	this._entMap={};


	this.onStep=undefined;



	/*
		Private vars
	*/



	/*
			Public methods
	*/
	this.Scene=function(id, onStepFunc) {
		if(id==undefined) id='';
		this.id=id;
		this.onStep=onStepFunc;
	}

	this.addEnt=function(entity) {
		if(typeof entity!='object') throw (this.id+': addEnt(entity) parameter "entity" must be a class Entity'); // DEBUG
		var id=entity.id;
		if(typeof id!='string') throw (this.id+': addEnt(entity) parameter "entity.id" must be a string; got a typeof('+id+')=='+typeof id); // DEBUG
		mapAdd(this._entArr, this._entMap, entity, function(obj) { return obj.id; });
	}
	this.getEnt=function(id) {
		if(typeof id!='number'&&typeof id!='string') throw (this.id+': getEnt(id) parameter "id" must be a number or string; got a typeof('+id+')=='+typeof id); // DEBUG
		return mapGet(this._entArr, this._entMap, id);
	}
	this.delEnt=function(id) {
		if(typeof id!='number'&&typeof id!='string') throw (this.id+': delEnt(id) parameter "id" must be a number or string; got a typeof('+id+')=='+typeof id); // DEBUG
		mapDel(this._entArr, this._entMap, id, function(obj) { return obj.id; });
	}

	// Drawing
	this.step=function() {
		if(this.onStep!=undefined) this.onStep(); // Call user defined step 1st

		// Extra stuff here?

		for(i=0; i<this._entArr.length; ++i) this._entArr[i].step();
	}

	this.draw=function(ctx, offset) {
		for(i=0; i<this._entArr.length; ++i) this._entArr[i].draw(ctx, offset);
	}



	/*
			Private methods
	*/



	// Constructor
	this.Scene(id);
}