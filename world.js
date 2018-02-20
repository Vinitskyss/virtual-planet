class World {
    constructor(width, height, plantsCount) {
        this.width = width;
        this.height = height;
        this.plants = [];
        this.plantsCount = plantsCount;
        this.seedPlants();
    }
    getTerrainType(x, y) {
        let freeSpace = true;
        if(x < 1 || x > this.width || y < 1 || y > this.height) {
            freeSpace = false;
        }
        return { freeSpace: freeSpace };
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
    }

}