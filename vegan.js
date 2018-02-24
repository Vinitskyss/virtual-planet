class Vegan extends Animal {
    constructor(x, y, hunger, speed, world, image, id, gen) {
        super(x, y, hunger, speed, world, image, id, gen);
        this.foodTarget = -1;
    }

    searchFood() {

        let dist = Infinity;
        let target = -1;
        for (let i = 0; i < this.world.plants.food.length; i++) {
            if (this.world.plants.food[i].vel > 0) {
                let newDist = Math.sqrt(Math.pow(this.x - this.world.plants.food[i].x, 2) +
                    Math.pow(this.y - this.world.plants.food[i].y, 2));
                if (newDist < dist) {
                    dist = newDist;
                    target = i;
                }
            }
        }
        if (target >= 0) {
            this.targetX = this.world.plants.food[target].x;
            this.targetY = this.world.plants.food[target].y;
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
            dist = Math.sqrt(Math.pow(this.x - this.world.plants.food[this.foodTarget].x, 2) +
                Math.pow(this.y - this.world.plants.food[this.foodTarget].y, 2));
        } catch (e) {
            this.searchFood();
            return false;
        }
        if (this.world.plants.food[this.foodTarget].vel > 0 && dist < 16) {
            let toFeed = this.maxHunger - this.hunger;
            if (this.world.plants.food[this.foodTarget].vel >= toFeed) {
                this.hunger += toFeed;
                this.world.plants.food[this.foodTarget].vel -= toFeed;
            } else {
                this.hunger += this.world.plants.food[this.foodTarget].vel
                this.world.plants.food[this.foodTarget].vel = 0;
            }
            this.foodTarget = -1;
            return true;
        }

        return false;
    }


}