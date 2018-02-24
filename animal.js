class Animal {

    constructor(x, y, hunger, speed, world, id, gen) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.hunger = hunger;
        this.world = world;
        this.generation = gen;
        this.minHunger = 10;
        this.maxHunger = 20;
        this.hungry = this.hunger < this.minHunger;
        this.sex = Math.floor(random(0, 2));
        this.targetX = 0;
        this.targetY = 0;
        this.error = 0;
        this.walkDistance = 40;
        this.descisionRate = 10;
        this.alive = true;
        this.foodTarget = -1;
        this.hungerDec = 0.01;
        this.readyToSpawn = false;
    }


    generateIdleTarget() {
        let done = false;
        while (!done) {
            let x = random(-this.walkDistance + this.x, this.walkDistance + this.x);
            let y = random(-this.walkDistance + this.y, this.walkDistance + this.y);
            if (this.world.getTerrainType(x, y).freeSpace) {
                done = true;
            }
            this.targetX = x;
            this.targetY = y;
        }
    }

    makeDescision(x) {
        if (Math.floor(random(0, x)) == 1) {
            let des = Math.floor(random(1, 3));
            if (this.hunger < 15 && des == 2 && this.sex != 1) {
                return 1;
            }
            return des;
        }
        return false;
    }

    idle() {
        let descision = this.makeDescision(this.descisionRate);
        if (descision == 1) {
            this.generateIdleTarget();
            this.image.play();
            this.walkTo(this.targetX, this.targetY);
        } else if (descision == 2) {
            if (!this.goSpawn()) {
                this.idle();
            }
        } else {
            this.walkTo(this.targetX, this.targetY);
        }
    }


    move() {

        if (this.hungry) {
            this.readyToSpawn = false;
            if (!this.checkFood()) {
                this.searchFood();
                this.walkTo(this.targetX, this.targetY);
                return;
            }
        }

        if (this.readyToSpawn) {
            if (this.sex == 0) {
                this.endWalk();
                return;
            }
            if (this.sex == 1) {
                if (!this.checkSpawn()) {
                    this.walkTo(this.targetX, this.targetY);
                }
                return;
            }
        }

        this.idle()
    }


    endWalk() {
        
        this.error = 0;

        try {
            if(this.image.playing()){ 
                this.image.pause();
                this.image.frame(1);   
            }
        } catch (e) {
            console.log();
        }

    }

    walkTo(x, y) {
        
        let targetX = Math.sign(Math.floor(x - this.x));
        let targetY = Math.sign(Math.floor(y - this.y));
        if (Math.pow(x - this.x, 2) < 2) {
            targetX = 0;
        }
        if (Math.pow(y - this.y, 2) < 2) {
            targetY = 0;
        }
        if (targetX == 0 && targetY == 0) {
            this.endWalk();
        }
        let range = Math.pow(this.x - x, 2) + Math.pow(this.y - y, 2);

        if (range < this.speed * 5 && this.speed - this.error > 2) {
            this.error++;
        }
        if (range > this.speed * 3) {
            if(!this.image.playing()){
                this.image.play();    
            }
            this.x += targetX * this.speed - this.error;
            this.y += targetY * this.speed - this.error;
        } else {
            this.endWalk();
        }

    }

    die() {
        this.alive = false;
        this.image = this.image_dead;
        console.log('died!');
    }

    update(world) {

        if (this.hunger <= 0 && this.alive) {
            this.die();
        }

        if (this.hunger < -20) {
            return;
        }
        this.world = world;
        this.hunger -= this.hungerDec;
        this.hungry = this.hunger < this.minHunger;
        this.show();
        if (!this.alive) {
            return;
        }
        this.move();

    }

}