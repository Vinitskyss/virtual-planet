
let canvas;
let vegans = [];
let veganCount = 1;
let world;

function setup(){
	frameRate(30);
	canvas = createCanvas(windowWidth, windowHeight);
	world = new World(width, height);
	for(let i = 0; i < veganCount; i++){
		vegans.push(new Vegan(random(0, width), random(0, height), 100, 20, world));
	}
}

function draw(){
	noStroke();
	background(55, 148,61);
	for(let i = 0; i < veganCount; i++){
		vegans[i].update();
		world.update();
	}
}
