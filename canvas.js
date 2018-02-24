let canvas;
let world;
let config;
//background
let groundGrass;
let bgWidth = 200;
let bgCols;
let bgRows;

function setup() {
    frameRate(30);
    //background
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

    //init world
    let rabbitsCount = 10;
    let foodCount = rabbitsCount * 4;
    config = {
        'world': {
            'width': windowWidth,
            'height': windowHeight,
        },
        'animals': {
            'rabbits': rabbitsCount,
        },
        'plants': {
            'food': foodCount,
        }
    }
    world = new World(config);

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