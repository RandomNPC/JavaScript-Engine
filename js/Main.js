
var canvas, ctx;
var mouse={ x: 0, y: 0 };

var cat;


window.onload=function() { // Makes sure the website is loaded before running code
	canvas=document.getElementById('canvas');
	ctx=canvas.getContext('2d');


	cat=new Ent('ent_nyancat');
	cat.addTexture('nyanCat', { x: 64, y: 64 });

	cat.face(5.5);
	setInterval(function() {
		cat.step();
		cat.draw(ctx, { x: 20, y: 20 });
	}, 1000/g_fpsEngine);
};