class Plant {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vel = 10;
        this.maxVel = 15;
        this.addRate = 0.1;
        this.wait = 1500;
        this.cooldown = this.wait;
        this.image = loadImage('images/grassFull.png');
    }

    update() {

        this.show();
        if (this.cooldown < this.wait) {
            this.cooldown++;
            if (this.cooldown == this.wait) {
                this.vel = 1;
                this.setImage();
            }
            return;
        }

        if (this.vel == 0) {
            this.cooldown = 0;
            this.setImage();
        }
        this.grow();

    }

    grow() {

        if (this.vel < this.maxVel) {
            this.vel += this.addRate;
        }
    }

    setImage() {
        switch (this.vel) {
            case 0:
                this.image = loadImage('images/grassEmpty.png');
                break;
            default:
                this.image = loadImage('images/grassFull.png');
                break;
        }
    }


    show() {
        image(this.image, this.x, this.y, this.image.width, this.image.height);
    }
}