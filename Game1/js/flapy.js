window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame       || 
		window.webkitRequestAnimationFrame || 
		window.mozRequestAnimationFrame    || 
		window.oRequestAnimationFrame      || 
		window.msRequestAnimationFrame   ||  
		function( callback ){
			return window.setTimeout(callback, 1000 / 60);
		};
})();

window.cancelRequestAnimFrame = ( function() {
	return window.cancelAnimationFrame          ||
		window.webkitCancelRequestAnimationFrame    ||
		window.mozCancelRequestAnimationFrame       ||
		window.oCancelRequestAnimationFrame     ||
		window.msCancelRequestAnimationFrame        ||
		clearTimeout
} )();


var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var W = 400;
var H = 600;
canvas.width = W;
canvas.height = H;
var images = [];
var FPS;

var charReady = false;
var character = new Image();
character.onload = function(){
    charReady = true;
};
character.src = "pic/pl.png";

var keysDown = {};
addEventListener("keydown", function(e){
    keysDown[e.keyCode] = true;
},false);
addEventListener("keyup",function(e){
    delete keysDown[e.keyCode];
},false);

var char = {
    velX: 2.5,
    velY: 3,
    x: 0,
    y: 0,
    a: 0.3
};


var reset = function() {
    char.x = 0;
    char.y = 0;
}

var update = function(){
    if(39 in  keysDown)
    {
        char.x += char.velX;
    }
    if(37 in keysDown)
    {
         char.x -= char.velX;
    }
    if(32 in keysDown)
    {
        char.velY = -5;
    }
    else
    {
        if(char.velY < 3)
        {
            char.velY += char.a;
        }
        
    }
    if(char.y + 125 < H)
    {
        char.y += char.velY; 
    }
    else
    {
        //reset();
    }
    
}

var draw = function(){
    ctx.clearRect(0,0,W,H);
    ctx.strokeRect(0,0,W,H);
    ctx.drawImage(character,char.x,char.y);
    
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
}

var delta = 0;

var main = function() {
    var now = Date.now();
    delta = now - then;
    update(delta/1000);
    FPS = delta;
    draw();
    then = now;
    
    requestAnimFrame(main);
}
var then = Date.now();
reset();
main();


