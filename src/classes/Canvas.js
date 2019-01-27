let canvas;
let world;
let config;
//background
let groundGrass;
let bgWidth = 200;
let bgCols;
let bgRows;
let width = 1000;
let height = 400;

let gif;

function setup() {

    frameRate(30);
    //background
    if(width == undefined) {
        width = windowWidth;
    }
    if(height == undefined) {
        height = windowHeight;
    }
    groundGrass = loadImage('src/images/grass.png');
    canvas = createCanvas(width, height);
    //canvas.parent('canvas');
    bgCols = width / bgWidth;
    bgRows = height / bgWidth;
    if(bgWidth % windowWidth > 0) {
        bgCols++;
    }
    if(bgWidth % windowHeight > 0) {
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
    //world = new World(config);
    gif = loadGif('src/images/skull.gif');
    
}

function draw() {
  //image(gif, 10,10, 10, 10);
    return ;
    noStroke();
    for(let y = 0; y < bgRows; y++) {
        for(let x = 0; x < bgCols; x++) {
            image(groundGrass, x * bgWidth, y * bgWidth, bgWidth, bgWidth);
        }
    }

    world.update();

}
