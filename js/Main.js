
var canvas, ctx;
var mouse={ x: 0, y: 0 };

var cat;


window.onload=function() { // Makes sure the website is loaded before running code
	canvas=document.getElementById('canvas');
	ctx=canvas.getContext('2d');


	cat=new Ent('ent_nyancat');
	cat.addTexture('nyanCat');
	cat.addTexture('nyanCat', { x: 64, y: 64 });

	cat._pos={ x: 100, y: 100 };
	cat.face(5.9);

	
	setInterval(function() {
		cat.move({ x: 200, y: 200 });
		cat.step();
		cat.draw(ctx);
	}, 1000/g_fpsEngine);
};