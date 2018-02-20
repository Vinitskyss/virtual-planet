class Plant {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vel = 10;
        this.maxVel = 10;
        this.addRate = 0.01;
        this.color = color(0, 0, 0);
        this.wait = 1500;
        this.cooldown = this.wait;
    }
    update() {
        this.show();
        if(this.cooldown < this.wait) {
            this.cooldown++;
            if(this.cooldown == this.wait) {
                this.vel = 1;
            }
            return;
        }

        if(this.vel == 0) {
            this.cooldown = 0;
        }
        this.grow();

    }

    grow() {
        if(this.vel < this.maxVel) {
            this.vel += this.addRate;
            return;
        }
    }

    show() {
        this.color = color(
            60 - map(this.vel, 0, this.maxVel, 50, 0),
            230 - map(this.vel, 0, this.maxVel, 220, 0),
            55 - map(this.vel, 0, this.maxVel, 45, 0));
        fill(this.color);
        ellipse(this.x, this.y, 5);
    }
}