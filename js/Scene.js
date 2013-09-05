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
	this._entsArr=[];
	this._entsMap={};


	this.Scene=function(id) {
		if(id==undefined) id='';
		this.id=id;

	}



	/*
		Private vars
	*/



	/*
			Public methods
	*/
	this.addEnt=function(entity) {
		if(typeof entity!='object') throw (this.id+': addEnt(entity) parameter "entity" must be a class Entity'); // DEBUG
		var id=entity.id;
		if(typeof id!='string') throw (this.id+': addEnt(entity) parameter "entity.id" must be a string; got a typeof('+id+')=='+typeof id); // DEBUG
		var i, key=this._entsMap[id];
		if(key==undefined) {
			i=this._entsArr.length; // New spot in the array
			this._entsArr.push(entity); // Set the entity at that spot
			this._entsMap[id]=i; // Update the map
		} else {
			this._entsArr[key]=entity;
		}
	}
	this.getEnt=function(id) {
		if(typeof id!='number'&&typeof id!='string') throw (this.id+': getEnt(id) parameter "id" must be a number or string; got a typeof('+id+')=='+typeof id); // DEBUG
		if(typeof id=='number') {
			return this._entsArr[id];
		} else {
			var key=this._entsMap[id];
			var result=this._entsArr[key];
			if(result==undefined) console.log(this.id+': getEnt(id) could not find "'+id+'"'); // DEBUG
			return result;
		}
	}
	this.delEnt=function(id) {
		if(typeof id!='number'&&typeof id!='string') throw (this.id+': delEnt(id) parameter "id" must be a number or string; got a typeof('+id+')=='+typeof id); // DEBUG
		if(typeof id=='number') {
		} else {
			var key=this._entsMap[id]; // Find where it is
			// not found
			delete this._entsMap[id]; // Delete it completely
			delete this._entsArr[key];
			if(0<this._entsArr.length) { // If not empty, close gap
				var i=this._entsArr.length-1;
				id=this._entsArr[i].id;
				this._entsArr[key]=this._entsArr[i] // Swap deleted slot with last
				this._entsMap[id]=key;
			}
			this._entsArr.splice(this._entsArr.length-1, 1);
		}
	}



	/*
			Private methods
	*/



	// Constructor
	this.Scene(id);
}