class Plant {
    constructor(x, y, vel) {
        this.x = x;
        this.y = y;
        this.vel = random(1, vel);
        this.maxVel = 15;
        this.addRate = 0.01;
        //this.wait = 1500;
        //this.cooldown = this.wait;
        this.image = loadImage('images/grassEmpty.png');
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
            this.image = loadImage('images/grassEmpty.png');
        } else {
            this.image = loadImage('images/grassFull.png');
        }
    }


    show() {
        image(this.image, this.x, this.y, this.image.width, this.image.height);
    }
}