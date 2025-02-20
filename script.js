let gototop = document.getElementById('top');

function topFunction() {
    document.documentElement.scrollTop = 0;
}
// Declare canvas and context
var canvas = document.getElementById('canvas');
var c = canvas.getContext('2d');
var	height = window.innerHeight;
var	width = window.innerWidth;
var cx = (width);
var cy = (height);
canvas.height = height;
canvas.width = width;

// Setup, used for refresh
function setup() {
	c.fillStyle = 'rgba(0, 0, 0, 0.1)';
	c.fillRect(0, 0, width, height);
}

// Random characters for the rain
var character = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A',  'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

// Change depth to give a more 3d look
function depth(z) {
	if (z > .4) {
		return 15;
	} else if (z > .7) {
		return 23;
	} else {
		return 30;
	}
}

// Determine color based on z
function color(z) {
	var random = Math.floor(Math.random()*100)
	if (random < 20 && z < .1) {
		return 'rgba(90,255,90,1)'
	}
	if (z > .2) {
		return 'rgba(0,70,0,1)';
	} else if (z > .4) {
		return 'rgba(0,90,0,1)';
	} else if (z > .6) {
		return 'rgba(0,150,0,1)';
	} else if (z > .8) {
		return 'rgba(0,200,0,1)';
	} else {
		return 'rgba(0,255,0,1)';
	}
}

// Font, see css for import
var font = "px New Rock";

// Create Matrix objects
function Matrix(x, y, z) {
	this.x = x;
	this.y = y;
	this.z = z;
	
	this.draw = function() {
		var index = Math.floor(Math.random()*character.length);
		c.beginPath();
		c.fillStyle = color(this.z);
		c.font = depth(this.z)+font;
		c.fillText(character[index], this.x, this.y);
		c.stroke();
	}
	
	this.update = function() {
		this.y = this.y + depth(this.z);
		
		if (this.y > height) {
			this.x = Math.random() * width;
			this.y = -Math.random() * height;
		}
	}
}

// Create objects
var rain = [];
var maxCount = width/5;
for (var i = 0; i < maxCount; i++) {
	var x = Math.random() * width;
	var y = -Math.random() * height;
	var z = Math.random();
	
	rain.push(new Matrix(x, y, z));
}

// Animate loop
var animate = setInterval(function () {
	setup();
	for (var i = 0; i < rain.length; i++) {
		rain[i].draw();
		rain[i].update();
	}
// 1000/fps you want
}, 1000/20);

// Resize window
window.addEventListener("resize", function(){
	height = window.innerHeight;
	width = window.innerWidth;

	canvas.height = height;
	canvas.width = width;

	cx = (width);
	cy = (height);
}, true);