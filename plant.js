class Plant {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vel = 10;
        this.maxVel = 10;
        this.addRate = 0.01;
        this.color = color(0, 0, 0);
        this.wait = 15000;
        this.cooldown = this.wait;
        this.image = loadImage('images/grassFull.png');
    }
    update() {

        this.show();
        if(this.cooldown < this.wait) {
            this.cooldown++;
            if(this.cooldown == this.wait) {
                this.vel = 1;
                this.setImage();
            }
            return;
        }

        if(this.vel == 0) {
            this.cooldown = 0;
            this.setImage();
        }
        this.grow();

    }

    grow() {
        if(this.vel < this.maxVel) {
            this.vel += this.addRate;
            return;
        }
    }

    setImage() {
        switch(this.vel) {
            case 0:
                this.image = loadImage('images/grassEmpty.png');
                break
            default:
                this.image = loadImage('images/grassFull.png');
                break
        }
    }


    show() {
        this.color = color(
            60 - map(this.vel, 0, this.maxVel, 50, 5),
            230 - map(this.vel, 0, this.maxVel, 220, 22),
            55 - map(this.vel, 0, this.maxVel, 45, 4));
        //fill(this.color);
        image(this.image, this.x, this.y, this.image.width, this.image.height);
        //ellipse(this.x, this.y, 5);
    }
}