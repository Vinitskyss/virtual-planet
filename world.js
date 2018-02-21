class World {
    constructor(width, height, plantsCount, veganCount, rabbitGif) {
        this.width = width;
        this.height = height;
        this.plants = [];
        this.vegans = [];
        this.veganCount = veganCount;
        this.plantsCount = plantsCount;
        this.rabbitGif = rabbitGif;
        this.seedRabbits(this.veganCount);
        this.seedPlants();
    }
    getTerrainType(x, y) {
        let freeSpace = true;
        if(x < 1 || x > this.width || y < 1 || y > this.height) {
            freeSpace = false;
        }
        return { freeSpace: freeSpace };
    }

    seedRabbits(count){
        for(let i = 0; i < count; i++) {
            this.vegans.push(new Vegan(random(0, this.width), random(0, this.height),
             100, 20, this, this.rabbitGif, i));
        }
    }

    seedPlants() {
        for(let i = 0; i < this.plantsCount; i++) {
            let x = random(0, this.width);
            let y = random(0, this.height);
            this.plants.push(new Plant(x, y));
        }
    }

    update() {
        for(let i = 0; i < this.plantsCount; i++) {
            this.plants[i].update();
        }

        for(let i = 0; i < this.vegans.length; i++) {
            if(this.vegans[i].image.loaded()) {
                this.vegans[i].update();
            }
        }
    }

}