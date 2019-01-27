class Rabbit extends Vegan {
    constructor(x, y, hunger, speed, world, image, id, gen) {
        super(x, y, hunger, speed, world, image, id, gen);
        this.imageSrc = 'src/images/rabbit.gif';
        this.image = loadGif(this.imageSrc);
        console.log(this.image);
        this.image_dead = loadGif('src/images/skull.gif');
        this.image.pause();
        this.minHunger = 10;
        this.maxHunger = 20;
        this.hungerDec = random(0.01, 0.03);
        this.walkDistance = 40;
        this.decisionRate = 10;
        this.hungerDec = 0.01;
        this.animalType = 'rabbits';
        this.stopFrame = 1;
    }

    show() {
        let sizes = [33, 53];
        if (this.alive) {
            sizes = [33, 53];
        } else if (!this.alive) {
            sizes = [32, 32];
        }
        image(this.image,
            this.x - (sizes[0] / 2),
            this.y - (sizes[1] / 2),
            sizes[0], sizes[1]);
    }
}
