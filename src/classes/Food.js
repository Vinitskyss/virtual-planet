class Food extends Plant {
    constructor(x, y, vel) {
        super(x, y);
        this.vel = random(1, vel);
        this.maxVel = 15;
        this.addRate = 0.01;
        this.image = loadImage('src/images/grassEmpty.png');
    }

    update() {
        if (this.vel <= 0) {
            return;
        }
        this.show();
        this.setImage();
        this.grow();

    }

    grow() {
        if (this.vel < this.maxVel) {
            this.vel += this.addRate;
        }
    }

    setImage() {
        if (this.vel < this.maxVel / 2) {
            this.image = loadImage('src/images/grassEmpty.png');
        } else {
            this.image = loadImage('src/images/grassFull.png');
        }
    }
}