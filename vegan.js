class Vegan extends Animal {
    constructor(x, y, hunger, speed, world, image, id, gen) {
        super(x, y, hunger, speed, world, image, id, gen);
        this.minHunger = Math.floor(random(8, 12));
        this.speed = speed;
        this.descisionRate = Math.floor(random(30, 50));
        this.hunger = hunger;
        this.foodTarget = -1;
        this.hungerDec = random(0.01, 0.03);
    }

    searchFood() {

        let dist = Infinity;
        let target = -1;
        for (let i = 0; i < this.world.plants.length; i++) {
            if (this.world.plants[i].vel > 0) {
                let newDist = Math.pow(this.x - this.world.plants[i].x, 2) +
                    Math.pow(this.y - this.world.plants[i].y, 2);
                if (newDist < dist) {
                    dist = newDist;
                    target = i;
                }
            }
        }
        if (target >= 0) {
            this.moving = true;
            this.targetX = this.world.plants[target].x;
            this.targetY = this.world.plants[target].y;
            this.foodTarget = target;

        } else {
            this.idle();
        }
    }

    checkFood() {
        if (this.foodTarget == -1) {
            return false;
        }
        let dist;
        try {
            dist = Math.pow(this.x - this.world.plants[this.foodTarget].x, 2) +
                Math.pow(this.y - this.world.plants[this.foodTarget].y, 2);
        } catch (e) {
            this.searchFood();
            return false;
        }
        if (this.world.plants[this.foodTarget].vel > 0 && dist < 16) {
            let toFeed = this.maxHunger - this.hunger;
            if (this.world.plants[this.foodTarget].vel >= toFeed) {
                this.hunger += toFeed;
                this.world.plants[this.foodTarget].vel -= toFeed;
            } else {
                this.hunger += this.world.plants[this.foodTarget].vel
                this.world.plants[this.foodTarget].vel = 0;
            }
            this.moving = false;
            this.foodTarget = -1;
            return true;
        }

        return false;
    }

    goSpawn() {
        if (this.hunger < 15) {
            return false;
        }
        for (let i = 0; i < this.world.vegans.length; i++) {
            //let newDist = Math.pow(this.x - this.world.vegans[i].x, 2) +
            //Math.pow(this.y - this.world.vegans[i].y, 2);
            if (this.world.vegans[i].sex != this.sex &&
                this.world.vegans[i].hunger > 15
                && this.world.vegans[i].readyToSpawn == false
            ) {
                console.log('GO SPAWN!');
                this.readyToSpawn = true;
                this.world.vegans[i].readyToSpawn = true;
                this.targetX = this.world.vegans[i].x;
                this.targetY = this.world.vegans[i].y;
                console.log(this.targetX);
                console.log(this.targetY);
                console.log('============')
                return;
            }
        }
    }

    checkSpawn() {
        for (let i = 0; i < this.world.vegans.length; i++) {
            let newDist = Math.pow(this.x - this.world.vegans[i].x, 2) +
                Math.pow(this.y - this.world.vegans[i].y, 2);
            if (this.world.vegans[i].sex != this.sex &&
                this.world.vegans[i].hunger >= 15 &&
                this.world.vegans[i].readyToSpawn == true &&
                newDist < 20) {

                this.readyToSpawn = false;
                this.world.vegans[i].readyToSpawn = false;
                this.hunger = 9;
                this.world.vegans[i].hunger = 9;
                return true;
            }

        }
        return false;
    }
}