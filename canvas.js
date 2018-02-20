
let canvas;
let width = $(window).width();
let height = $(window).height();
let vegans = [];
let veganCount = 5;
let world;

function setup(){
	frameRate(10);
	canvas = createCanvas(width, height);
	world = new World(width, height);
	for(let i = 0; i < veganCount; i++){
		vegans.push(new Vegan(random(0, width), random(0, height), 100, 20, world));
	}
}

function draw(){
	background(55, 148,61);
	for(let i = 0; i < veganCount; i++){
		vegans[i].update();
	}
}