class World extends WorldController {
    constructor(config) {
        super(config);
        this.animalId = 0;
        this.animalCount = animalCount;
        this.veganCount = Math.floor();
        this.plantsCount = Math.floor(this.veganCount * 4);
        this.rabbitGif = rabbitGif;
        this.seedRabbits(this.veganCount, 1);
        this.seedPlants(this.plantsCount, 10);
    }

    getTerrainType(x, y) {
        let freeSpace = true;
        if (x < 1 || x > this.width || y < 1 || y > this.height) {
            freeSpace = false;
        }
        return {freeSpace: freeSpace};
    }

    seedRabbits(count, gen) {
        for (let i = 0; i < count; i++) {
            this.vegans.push(new Vegan(random(0, this.width), random(0, this.height),
                Math.floor(random(8, 12)), Math.floor(random(1, 2.3)), this, this.rabbitGif, this.animalId, gen));
            this.animalId++;
        }
    }

    seedGrass(count, vel) {
        for (let i = 0; i < count; i++) {
            let x = random(0, this.width);
            let y = random(0, this.height);
            this.plants.push(new Grass(x, y, vel));
        }
    }

    updateGrass(){
        for (let i = 0; i < this.plants.length; i++) {
            this.plants[i].update();
        }

        for (let i = this.plants.length - 1; i > 0; i--) {
            if (this.plants[i].vel <= 0) {
                this.plants.splice(i, 1);
            }
        }
        let prob = this.plantsCount - this.plants.length;
        let r = random(3, this.plantsCount * 2);
        if (prob > r) {
            this.seedPlants(1, 5);
        }
    }

    updatePlants() {
        

    }

    updateVegans() {
        for (let i = 0; i < this.vegans.length; i++) {
            if (this.vegans[i].image.loaded()) {
                this.vegans[i].update(this);

                if (this.vegans[i].checkSpawn() && this.vegans[i].sex == 1) {
                    this.vegans.push(new Vegan(this.vegans[i].x, this.vegans[i].y,
                        14, Math.floor(random(1, 2.3)), this, this.rabbitGif, this.animalId, this.vegans[i].generation + 1));
                    this.animalId++;
                    console.log('SPAWNED!');
                    console.log(this.vegans[i].x);
                    console.log(this.vegans[i].y);
                    console.log('======');
                }
            }
        }

        for (let i = this.vegans.length - 1; i > 0; i--) {
            if (this.vegans[i].hunger <= -20) {
                this.vegans.splice(i, 1);
            }
        }
    }

    update() {

        this.updatePlants();

        this.updateVegans();

    }

}