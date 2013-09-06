var list;

function List(){
	list = new Array();
}

List.prototype.add = function(value){
	list.push(value);
}

List.prototype.clear = function(){
	while(list.length>0){
		list.pop();
	}
}

List.prototype.remove = function(value){
	var found = list.indexOf(value);
	if(found < 0) return;
	else list.splice(found,1);
}

List.prototype.reverse = function(){
	list.reverse();
}

List.prototype.indexOf = function(value){
	return list.indexOf(value);
}

List.prototype.length = function(){
	return list.length;
}

List.prototype.contentsAt = function(value){
	if(value > list.length || value < 0) return 'undefined';
	else return list[value];
}