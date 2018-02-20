let canvas;
let vegans = [];
let veganCount = 6;
let world;
let plantsCount = veganCount * 3;

function setup() {
    frameRate(30);
    canvas = createCanvas(windowWidth, windowHeight);
    world = new World(width, height, plantsCount);
    for(let i = 0; i < veganCount; i++) {
        vegans.push(new Vegan(random(0, width), random(0, height), 100, 20, world));
    }
}

function draw() {
    noStroke();
    background(55, 148, 61);
    for(let i = 0; i < veganCount; i++) {
        vegans[i].update();
        world.update();
    }
}