class Animal {

    constructor(x, y, hunger, speed, world, image, id) {
        this.id = id;
        this.hunger = hunger;
        this.minHunger = 10;
        this.maxHunger = 20;
        this.x = x;
        this.y = y;
        this.sex = Math.floor(random(0, 2));
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
        this.image_dead = loadGif('images/skull.gif');
        this.image.pause();
        this.readyToSpawn = false;

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
            let des = Math.floor(random(1, 3));
            if(this.hunger < 10 && des == 2 && this.sex != 1){
                return 1;
            }
            return des;
        }
        return false;
    }

    idle() {
        let descision = this.makeDescision(this.descisionRate);
        if(descision == 1) {
            this.generateIdleTarget();
            this.moving = true;
            this.image.play();

        }else if(descision == 2){
            this.goSpawn();
        }
    }


    move() {
        
        if(this.sex == 0 && this.readyToSpawn == true){
            return;
        }
        if(this.sex == 1 && this.readyToSpawn == true){
            if(!this.checkSpawn()){
                this.walkTo(this.targetX, this.targetY);
            }
            return;
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
        this.image = this.image_dead;
        console.log('died!');
    }

    show() {
        //fill(this.color);
        //ellipse(this.x, this.y, 5);
        let sizes = [33, 53];
        if(this.alive){
            sizes = [33, 53];
        }else if(!this.alive){
            sizes = [32, 32];
        }
        image(this.image, 
              this.x - (sizes[0] / 2),
              this.y - (sizes[1] / 2),
              sizes[0], sizes[1]);
    }

    update() {
        
        if(this.hunger <= 0 && this.alive) {
            this.die();
        }

        if(this.hunger < -20){
            //this.world.vegans.splice(this.id);
            return;
        }

        this.hunger -= this.hungerDec;
        this.show();
        if(!this.alive) {
            this.color = 'black';
            return;
        }
        this.move();

    }

}