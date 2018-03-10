let canvas;
let world;
let config;
//background
let groundGrass;
let bgWidth = 200;
let bgCols;
let bgRows;
let width;
let height;
function setup() {
    frameRate(30);
    //background
    if (width == undefined) {
        width = windowWidth;
    }
    if (height == undefined) {
        height = windowHeight;
    }
    groundGrass = loadImage('src/images/grass.png');
    canvas = createCanvas(width, height);
    //canvas.parent('canvas');
    bgCols = width / bgWidth;
    bgRows = height / bgWidth;
    if (bgWidth % windowWidth > 0) {
        bgCols++;
    }
    if (bgWidth % windowHeight > 0) {
        bgRows++;
    }

    //init world
    let wolvesCount = 5;
    let rabbitsCount = wolvesCount * 4;
    let foodCount = rabbitsCount * 4;

    config = {
        'world': {
            'width': width,
            'height': height,
        },
        'animals': {
            'rabbits': rabbitsCount,
            'wolves': wolvesCount,
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