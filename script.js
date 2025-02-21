// Fonction pour Retourner au début de la page
let gototop = document.getElementById('top');

function topFunction() {
    document.documentElement.scrollTop = 0;
}
////////////////////////////////////////////////////////////////
// Mise en place Variables
var canvas = document.getElementById('canvas');
var c = canvas.getContext('2d');
var	height = window.innerHeight;
var	width = window.innerWidth;
var cx = (width);
var cy = (height);
canvas.height = height;
canvas.width = width;

// Setup & refresh
function setup() {
	c.fillStyle = 'rgba(0, 0, 0, 0.1)';
	c.fillRect(0, 0, width, height);
}

// Character utilisés pour la matrix
var character = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A',  'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

// AJOUT 3D
function depth(z) {
	if (z > .4) {
		return 15;
	} else if (z > .7) {
		return 23;
	} else {
		return 30;
	}
}

// Couleur Basées sur l'axe Z (3D)
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

// Font (Bugée Car non importée Mais Fonctionelle Donc on touches pas)
var font = "px New Rock";

// Création de la MatrixRain
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

// Creation Objects
var rain = [];
var maxCount = width/5;
for (var i = 0; i < maxCount; i++) {
	var x = Math.random() * width;
	var y = -Math.random() * height;
	var z = Math.random();
	
	rain.push(new Matrix(x, y, z));
}

// Animation + Boucle
var animate = setInterval(function () {
	setup();
	for (var i = 0; i < rain.length; i++) {
		rain[i].draw();
		rain[i].update();
	}
// FPS (1000/Nb D'FPS)
}, 1000/20);

// Resize si jamais la fenêtre est redimensionnée
window.addEventListener("resize", function(){
	height = window.innerHeight;
	width = window.innerWidth;

	canvas.height = height;
	canvas.width = width;

	cx = (width);
	cy = (height);
}, true);