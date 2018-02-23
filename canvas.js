let canvas;
let veganCount = 10;
let world;
let plantsCount = veganCount * 4.5;

let rabbitGif = 'images/rabbit.gif';
let groundGrass;
let bgWidth = 200;
let bgCols;
let bgRows;

function setup() {
    frameRate(30);
    groundGrass = loadImage('images/grass.png');
    canvas = createCanvas(windowWidth, windowHeight);
    bgCols = windowWidth / bgWidth;
    bgRows = windowHeight / bgWidth;
    if (bgWidth % windowWidth > 0) {
        bgCols++;
    }
    if (bgWidth % windowHeight > 0) {
        bgRows++;
    }
    world = new World(width, height, Math.floor(plantsCount), veganCount, rabbitGif);

}

function draw() {
    noStroke();
    for (let y = 0; y < bgRows; y++) {
        for (let x = 0; x < bgCols; x++) {
            image(groundGrass, x * bgWidth, y * bgWidth, bgWidth, bgWidth);
        }
    }
    world.update();
}