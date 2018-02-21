class Animal {

    constructor(x, y, hunger, speed, world, image) {
        this.hunger = hunger;
        this.minHunger = 10;
        this.maxHunger = 20;
        this.x = x;
        this.y = y;
        this.targetX = 0;
        this.targetY = 0;
        this.speed = 1;
        this.error = 0;
        this.color = 'brown';
        this.world = world;
        this.moving = false;
        this.walkDistance = 40;
        this.descisionRate = 10;
        this.alive = true;
        this.foodTarget = -1;
        this.hungerDec = 0.01;
        this.imageSrc = image;
        this.image = loadGif(this.imageSrc);

        this.image.pause();
    }


    generateIdleTarget() {
        let done = false;
        while(!done) {
            let x = random(-this.walkDistance + this.x, this.walkDistance + this.x);
            let y = random(-this.walkDistance + this.y, this.walkDistance + this.y);
            if(this.world.getTerrainType(x, y).freeSpace) {
                done = true;
            }
            this.targetX = x;
            this.targetY = y;
        }
    }

    makeDescision(x) {
        if(Math.floor(random(0, x)) == 1) {
            return true;
        }
        return false;
    }

    idle() {

        if(this.makeDescision(this.descisionRate)) {
            this.generateIdleTarget();
            this.moving = true;
            this.image.play();

        }
    }

    move() {
        this.hunger -= this.hungerDec;

        if(this.hunger <= 0) {
            this.die();
        }

        if(this.moving == true && this.checkFoodVel() == true) {
            this.walkTo(this.targetX, this.targetY);
            return;
        }

        if(this.hunger < this.minHunger) {

            if(!this.checkFood()) {
                this.searchFood();
            }

        } else {
            this.idle()
        }
    }

    endWalk() {
        this.moving = false;
        this.error = 0;

        try {
            this.image.pause();
            this.image.frame(1);
        } catch(e) {
            console.log();
        }

    }

    walkTo(x, y) {
        this.image.play();
        let targetX = Math.sign(Math.floor(x - this.x));
        let targetY = Math.sign(Math.floor(y - this.y));
        if(Math.pow(x - this.x, 2) < 2) {
            targetX = 0;
        }
        if(Math.pow(y - this.y, 2) < 2) {
            targetY = 0;
        }
        if(targetX == 0 && targetY == 0) {
            this.endWalk();
        }
        let range = Math.pow(this.x - x, 2) + Math.pow(this.y - y, 2);

        if(range < this.speed * 5 && this.speed - this.error > 2) {
            this.error++;
        }
        if(range > this.speed * 3) {
            this.x += targetX * this.speed - this.error;
            this.y += targetY * this.speed - this.error;
        } else {
            this.endWalk();
        }

    }

    die() {
        this.alive = false;
        console.log('died!');
    }

    show() {
        //fill(this.color);
        //ellipse(this.x, this.y, 5);
        image(this.image, this.x - (this.image.width / 2), this.y - (this.image.height / 2));
    }

    update() {
        this.show();

        if(!this.alive) {
            this.color = 'black';
            return;
        }
        this.move();

    }

}