class Carnivore extends Animal {
    constructor(x, y, hunger, speed, world, image, id, gen) {
        super(x, y, hunger, speed, world, image, id, gen);
        this.foodTarget = -1;
    }

    searchFood() {
        let dist = Infinity;
        let target = -1;
        let targets = this.world.animals.rabbits;

        for (let i = 0; i < targets.length; i++) {
            if (targets[i].alive) {
                let newDist = Math.sqrt(Math.pow(this.x - targets[i].x, 2) +
                    Math.pow(this.y - targets[i].y, 2));
                if (newDist < dist) {
                    dist = newDist;
                    target = i;
                }
            }
        }
        if (target >= 0) {
            this.targetX = targets[target].x;
            this.targetY = targets[target].y;
            this.foodTarget = target;
        } else {
            this.idle();
        }
    }

    checkFood() {
        //console.log('check');
        if (this.foodTarget == -1) {
            return false;
        }
        let targets = this.world.animals.rabbits;
        let dist;
        let toDie;
        try {
            dist = Math.sqrt(Math.pow(this.x - targets[this.foodTarget].x, 2) +
                Math.pow(this.y - targets[this.foodTarget].y, 2));
        } catch (e) {
            //food despawned
            this.searchFood();
            return false;
        }
        if (targets[this.foodTarget].alive && dist < 8) {
            let toFeed = this.maxHunger - this.hunger;
            if (targets[this.foodTarget].hunger >= toFeed) {
                this.hunger += toFeed;
                toDie = targets[this.foodTarget].id;
            } else {
                this.hunger += targets[this.foodTarget].hunger;
                toDie = targets[this.foodTarget].id;
            }
            this.world.killAnimal(toDie);
            this.foodTarget = -1;
            return true;
        }
        return false;
    }

    genPrefTarget() {
        let x = 0;
        let y = 0;
        let count = 0;
        let targets = this.world.animals.rabbits;
        for (let i = 0; i < targets.length; i++) {
            if (targets[i].alive) {
                let newDist = Math.sqrt(Math.pow(this.x - targets[i].x, 2) +
                    Math.pow(this.y - targets[i].y, 2));
                if (newDist < this.walkDistance) {
                    x += targets[i].x;
                    y += targets[i].y;
                    count += 1;
                }
            }

        }
        if (count == 0) {
            return [0, 0];
        }
        return [x / count, y / count];
    }
}